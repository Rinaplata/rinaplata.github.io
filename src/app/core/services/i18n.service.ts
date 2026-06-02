import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import enTranslations from '../i18n/translations.en.json';
import esTranslations from '../i18n/translations.es.json';

export type Language = 'es' | 'en';
type TranslationTree = Record<string, unknown>;

const translations: Record<Language, TranslationTree> = {
  en: enTranslations,
  es: esTranslations
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly supportedLanguages: Language[] = ['es', 'en'];
  private readonly currentLanguageSubject = new BehaviorSubject<Language>(this.getInitialLanguage());

  readonly currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();

  constructor() {
    this.setLanguage(this.getInitialLanguage());
  }

  /**
   * Get the initial language based on browser settings or localStorage
   */
  private getInitialLanguage(): Language {
    // Check localStorage first
    const stored = localStorage.getItem('preferred-language');
    if (stored && this.isValidLanguage(stored)) {
      return stored as Language;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.isValidLanguage(browserLang)) {
      return browserLang as Language;
    }

    return 'en';
  }

  /**
   * Check if language code is supported
   */
  private isValidLanguage(lang: string): lang is Language {
    return this.supportedLanguages.includes(lang as Language);
  }

  /**
   * Set the current language
   */
  setLanguage(language: Language): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('preferred-language', language);
      document.documentElement.lang = language;
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  /**
   * Translate a key using dot notation (e.g., 'hero.title')
   */
  translate(key: string): string {
    const language = this.getCurrentLanguage();
    const keys = key.split('.');
    const value = this.resolveTranslation(translations[language], key)
      ?? this.resolveTranslation(translations.en, key);

    return typeof value === 'string' ? value : key;
  }

  translateWithParams(key: string, params: Record<string, string | number>): string {
    return this.translate(key).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, paramKey: string) =>
      String(params[paramKey] ?? '')
    );
  }

  /**
   * Get all translations for current language
   */
  getTranslations() {
    return translations[this.getCurrentLanguage()];
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): Language[] {
    return this.supportedLanguages;
  }

  private resolveTranslation(source: TranslationTree, key: string): unknown {
    return key.split('.').reduce<unknown>((value, part) => {
      if (value && typeof value === 'object' && part in value) {
        return (value as Record<string, unknown>)[part];
      }

      return undefined;
    }, source);
  }
}
