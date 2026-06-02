import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-language-selector-modal',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="language-selector-modal" role="dialog" aria-labelledby="language-modal-title">
      <div class="modal-content">
        <h2 id="language-modal-title" class="modal-title">{{ 'common.language' | t }}</h2>
        
        <div class="language-list" role="group" [attr.aria-label]="'a11y.preferredLanguage' | t">
          @for (lang of languages; track lang) {
            <button
              [class.active]="currentLanguage === lang"
              (click)="selectLanguage(lang)"
              class="language-option"
              [attr.aria-pressed]="currentLanguage === lang"
            >
              <span class="flag">
                {{ lang === 'es' ? 'ES' : 'EN' }}
              </span>
              <span class="name">
                {{ lang === 'es' ? ('common.spanish' | t) : ('common.english' | t) }}
              </span>
              @if (currentLanguage === lang) {
                <span class="checkmark" aria-hidden="true">✓</span>
              }
            </button>
          }
        </div>
        
        <p class="language-info">
          {{ 'common.preferredLanguageSaved' | t }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .language-selector-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    }

    .modal-content {
      background: var(--color-surface);
      border-radius: 1rem;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-title {
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
      color: var(--color-text);
      text-align: center;
    }

    .language-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .language-option {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 2px solid var(--color-border);
      background: var(--color-surface-soft);
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      text-align: left;
    }

    .language-option:hover {
      background: var(--color-surface-lilac);
      border-color: var(--color-primary);
    }

    .language-option.active {
      background: var(--color-primary);
      color: var(--color-surface);
      border-color: var(--color-primary);
      font-weight: 700;
    }

    .language-option:focus-visible {
      outline: 3px solid var(--focus-ring);
      outline-offset: 2px;
    }

    .flag {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .name {
      flex: 1;
      font-weight: 600;
    }

    .checkmark {
      color: var(--color-primary);
      font-weight: bold;
      font-size: 1.2rem;
    }

    .language-option.active .checkmark {
      color: var(--color-surface);
    }

    .language-info {
      font-size: 0.875rem;
      color: var(--color-muted);
      text-align: center;
      line-height: 1.6;
      margin: 0;
    }
  `]
})
export class LanguageSelectorModalComponent implements OnInit {
  languages: ('en' | 'es')[] = ['en', 'es'];
  currentLanguage: 'es' | 'en' = 'es';

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.i18nService.currentLanguage$.subscribe((lang: 'es' | 'en') => {
      this.currentLanguage = lang;
    });
  }

  selectLanguage(lang: 'es' | 'en'): void {
    this.i18nService.setLanguage(lang);
  }
}
