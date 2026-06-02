import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { I18nService } from '../services/i18n.service';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const NAV_ITEMS = [
  { label: 'header.nav.home', fragment: 'inicio' },
  { label: 'header.nav.about', fragment: 'sobre-mi' },
  { label: 'header.nav.experience', fragment: 'experiencia' },
  { label: 'header.nav.talks', fragment: 'charlas' },
  { label: 'header.nav.communities', fragment: 'comunidades' },
  { label: 'header.nav.projects', fragment: 'proyectos' },
  { label: 'header.nav.contact', fragment: 'redes-sociales' }
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <header class="site-header">
      <a class="skip-link" href="#main-content">{{ 'a11y.skipToMain' | t }}</a>

      <nav class="nav" [attr.aria-label]="'a11y.mainNavigation' | t">
        <a class="brand" routerLink="/" fragment="inicio" (click)="closeMenu()">Rina Plata</a>

        <button
          class="icon-button nav-toggle"
          type="button"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="main-menu"
          [attr.aria-label]="'a11y.menuToggle' | t"
          (click)="menuOpen.set(!menuOpen())"
        >
          <span aria-hidden="true">{{ menuOpen() ? '×' : '☰' }}</span>
        </button>

        <ul class="nav-panel" [class.is-open]="menuOpen()" id="main-menu">
          @for (item of navItems; track item.fragment) {
            <li>
              <a routerLink="/" [fragment]="item.fragment" (click)="closeMenu()">{{ item.label | t }}</a>
            </li>
          }
        </ul>

        <div class="nav-actions">
          <app-language-switcher></app-language-switcher>

          <button
            class="theme-toggle"
            type="button"
            [attr.aria-pressed]="theme.isDark()"
            [attr.aria-label]="theme.isDark() ? ('a11y.themeLight' | t) : ('a11y.themeDark' | t)"
            (click)="theme.toggle()"
          >
            @if (theme.isDark()) {
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M12 4.5V2h2v2.5h-2Zm0 17.5v-2.5h2V22h-2ZM4.5 14H2v-2h2.5v2Zm17.5 0h-2.5v-2H22v2ZM6.4 7.8 4.7 6.1l1.4-1.4 1.7 1.7-1.4 1.4Zm11.5 11.5-1.7-1.7 1.4-1.4 1.7 1.7-1.4 1.4Zm-.3-11.5-1.4-1.4 1.7-1.7 1.4 1.4-1.7 1.7ZM6.1 19.3l-1.4-1.4 1.7-1.7 1.4 1.4-1.7 1.7ZM13 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
              </svg>
            } @else {
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M18.9 15.4A7.8 7.8 0 0 1 8.6 5.1 8.5 8.5 0 1 0 18.9 15.4ZM12 21a7 7 0 0 1-5.4-11.5 9.8 9.8 0 0 0 7.9 7.9A7 7 0 0 1 12 21Z" />
                <path d="M18.7 4.2 19.4 6l1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7L18 6l.7-1.8ZM14.6 2l.45 1.15L16.2 3.6l-1.15.45L14.6 5.2l-.45-1.15L13 3.6l1.15-.45L14.6 2Z" />
              </svg>
            }
          </button>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    @media (max-width: 768px) {
      .nav-actions {
        gap: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);
  readonly navItems = NAV_ITEMS;
  readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
