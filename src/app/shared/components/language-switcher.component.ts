import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="language-switcher" role="group" [attr.aria-label]="'a11y.languageSelector' | t">
      @for (lang of languages; track lang) {
        <button
          type="button"
          class="language-button"
          [class.active]="currentLanguage === lang"
          [attr.aria-pressed]="currentLanguage === lang"
          [attr.lang]="lang"
          (click)="switchLanguage(lang)"
        >
          {{ lang === 'es' ? 'ES' : 'EN' }}<span class="sr-only"> {{ lang === 'es' ? 'Español' : 'English' }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .language-switcher {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 3px;
      border: 1px solid var(--color-border);
      border-radius: 999px;
      background: var(--color-surface);
    }

    .language-button {
      min-width: 44px;
      min-height: 38px;
      padding: 0 0.7rem;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--color-muted);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      transition: background-color 150ms ease, color 150ms ease;
    }

    .language-button:hover {
      color: var(--color-text);
    }

    .language-button.active {
      background: var(--color-text);
      color: var(--color-bg);
    }

    .language-button:focus-visible {
      outline: 3px solid var(--focus-ring);
      outline-offset: 2px;
    }

    @media (forced-colors: active) {
      .language-button.active {
        border: 2px solid CanvasText;
      }
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  languages: ('en' | 'es')[] = ['es', 'en'];
  currentLanguage: 'es' | 'en' = 'es';

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.i18nService.currentLanguage$.subscribe((lang: 'es' | 'en') => {
      this.currentLanguage = lang;
    });
  }

  switchLanguage(lang: 'es' | 'en'): void {
    this.i18nService.setLanguage(lang);
  }
}
