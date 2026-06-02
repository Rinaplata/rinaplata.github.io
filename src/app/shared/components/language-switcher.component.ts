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
      <span class="language-switcher__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-3.18a15.5 15.5 0 0 0-1.05-5.05A8.03 8.03 0 0 1 18.93 11ZM12 4.04c.5.72 1.42 2.45 1.72 6.96h-3.44c.3-4.51 1.22-6.24 1.72-6.96ZM4.07 13h3.18c.14 2.08.5 3.77 1.05 5.05A8.03 8.03 0 0 1 4.07 13Zm3.18-2H4.07A8.03 8.03 0 0 1 8.3 5.95 15.5 15.5 0 0 0 7.25 11ZM12 19.96c-.5-.72-1.42-2.45-1.72-6.96h3.44c-.3 4.51-1.22 6.24-1.72 6.96Zm2.7-1.91c.55-1.28.91-2.97 1.05-5.05h3.18a8.03 8.03 0 0 1-4.23 5.05Z" />
        </svg>
      </span>

      <span class="language-switcher__track" aria-hidden="true">
        <span class="language-switcher__thumb" [class.is-spanish]="currentLanguage === 'es'"></span>
      </span>

      @for (lang of languages; track lang) {
        <button
          [attr.aria-pressed]="currentLanguage === lang"
          [attr.aria-label]="lang === 'es' ? ('common.switchToSpanish' | t) : ('common.switchToEnglish' | t)"
          [class.active]="currentLanguage === lang"
          (click)="switchLanguage(lang)"
          class="language-button"
          [title]="lang === 'es' ? ('common.switchToSpanish' | t) : ('common.switchToEnglish' | t)"
        >
          <span class="language-button__badge" aria-hidden="true">{{ lang === 'es' ? 'ES' : 'US' }}</span>
          <span class="language-button__text">{{ lang === 'es' ? ('common.spanish' | t) : ('common.english' | t) }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .language-switcher {
      --switch-padding: 0.25rem;
      --switch-button-width: 6.45rem;
      --switch-height: 3rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      min-height: var(--switch-height);
      padding: var(--switch-padding);
      border: 1px solid color-mix(in srgb, var(--color-primary-strong) 20%, var(--color-border));
      border-radius: 999px;
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 92%, white), var(--color-surface-soft));
      box-shadow:
        0 10px 28px rgba(107, 33, 168, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.78);
      isolation: isolate;
    }

    :host-context(.dark) .language-switcher,
    :host-context(:root.dark) .language-switcher,
    :host-context(html.dark) .language-switcher {
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 90%, white 4%), var(--color-surface-soft));
      box-shadow:
        0 10px 28px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .language-switcher__icon {
      z-index: 2;
      width: 2rem;
      height: 2rem;
      margin-left: 0.1rem;
      display: inline-grid;
      place-items: center;
      border-radius: 999px;
      color: var(--color-primary-strong);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    }

    .language-switcher__icon svg {
      width: 1.05rem;
      height: 1.05rem;
      fill: currentColor;
    }

    .language-switcher__track {
      position: absolute;
      inset: var(--switch-padding) var(--switch-padding) var(--switch-padding) calc(var(--switch-padding) + 2.25rem);
      z-index: 0;
      pointer-events: none;
    }

    .language-switcher__thumb {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--switch-button-width);
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(135deg, #581c87, #6b21a8 58%, #7e22ce);
      box-shadow:
        0 10px 24px rgba(107, 33, 168, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: transform 220ms ease;
    }

    .language-switcher__thumb.is-spanish {
      transform: translateX(calc(var(--switch-button-width) + 0.25rem));
    }

    .language-button {
      position: relative;
      z-index: 1;
      width: var(--switch-button-width);
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.45rem 0.7rem;
      border: 0;
      background: transparent;
      color: var(--color-muted);
      border-radius: 999px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 800;
      line-height: 1;
      transition: color 180ms ease, transform 180ms ease;
    }

    .language-button:hover {
      color: var(--color-primary-strong);
      transform: translateY(-1px);
    }

    .language-button.active {
      color: #ffffff;
    }

    .language-button:focus-visible {
      outline: 3px solid var(--focus-ring);
      outline-offset: 3px;
    }

    .language-button__badge {
      width: 1.55rem;
      height: 1.55rem;
      display: inline-grid;
      place-items: center;
      border-radius: 999px;
      background: color-mix(in srgb, var(--color-primary-strong) 12%, var(--color-surface));
      color: var(--color-primary-strong);
      font-size: 0.72rem;
      font-weight: 900;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary-strong) 14%, transparent);
      transition: background-color 180ms ease, color 180ms ease;
    }

    .language-button.active .language-button__badge {
      background: rgba(255, 255, 255, 0.18);
      color: #ffffff;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.34);
    }

    .language-button__text {
      min-width: 3.05rem;
      text-align: left;
    }

    @media (max-width: 820px) {
      .language-switcher {
        --switch-button-width: 3.05rem;
      }

      .language-button {
        flex: 1 0 var(--switch-button-width);
        padding-inline: 0.35rem;
      }

      .language-button__text {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        border: 0;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
    }

    @media (max-width: 420px) {
      .language-switcher {
        --switch-button-width: 2.85rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .language-switcher__thumb,
      .language-button,
      .language-button__badge {
        transition: none;
      }

      .language-button:hover {
        transform: none;
      }
    }

    @media (prefers-contrast: more) {
      .language-switcher {
        border: 2px solid currentColor;
        background: var(--color-surface);
        box-shadow: none;
      }

      .language-switcher__icon,
      .language-button__badge {
        background: transparent;
        box-shadow: inset 0 0 0 2px currentColor;
      }

      .language-switcher__thumb {
        background: var(--color-primary-strong);
        box-shadow: none;
      }

      .language-button {
        color: var(--color-text);
      }

      .language-button.active,
      .language-button.active .language-button__badge {
        color: #ffffff;
      }

      :host-context(.dark) .language-button.active,
      :host-context(.dark) .language-button.active .language-button__badge,
      :host-context(html.dark) .language-button.active,
      :host-context(html.dark) .language-button.active .language-button__badge {
        color: #17091a;
      }
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  languages: ('en' | 'es')[] = ['en', 'es'];
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
