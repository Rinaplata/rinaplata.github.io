import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { FocusService } from '../services/focus.service';
import { I18nService } from '../services/i18n.service';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher.component';
import { PreferencesPanelComponent } from '../../shared/components/preferences-panel.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const NAV_ITEMS = [
  { label: 'header.nav.about', fragment: 'sobre-mi' },
  { label: 'header.nav.experience', fragment: 'experiencia' },
  { label: 'header.nav.talks', fragment: 'charlas' },
  { label: 'header.nav.communities', fragment: 'comunidades' },
  { label: 'header.nav.projects', fragment: 'proyectos' },
  { label: 'header.nav.demos', fragment: 'demos' },
  { label: 'header.nav.contact', fragment: 'contacto' }
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSwitcherComponent, PreferencesPanelComponent, TranslatePipe],
  template: `
    <header class="site-header">
      <a class="skip-link" href="#/#main-content" (click)="skipToMain($event)">{{ 'a11y.skipToMain' | t }}</a>

      <nav class="nav" [attr.aria-label]="'a11y.mainNavigation' | t" (focusout)="onNavFocusOut($event)">
        <a class="brand" href="#/#inicio" (click)="goTo('inicio', $event)">
          <img src="assets/images/rina/rina-avatar-192.jpg" width="32" height="32" alt="">
          <span class="brand__name">Rina Plata</span>
        </a>

        <button
          #menuToggle
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
              <a [href]="'#/#' + item.fragment" (click)="goTo(item.fragment, $event)">{{ item.label | t }}</a>
            </li>
          }
        </ul>

        <div class="nav-actions">
          <app-language-switcher></app-language-switcher>

          <app-preferences-panel />
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  readonly i18n = inject(I18nService);
  private readonly focus = inject(FocusService);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  readonly navItems = NAV_ITEMS;
  readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  goTo(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    this.closeMenu();
    this.focus.goToSection(fragment);
  }

  onNavFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as HTMLElement | null;
    const leftMenu = next && !next.closest('#main-menu') && !next.classList.contains('nav-toggle');

    if (this.menuOpen() && leftMenu) {
      this.closeMenu();
    }
  }

  skipToMain(event: MouseEvent): void {
    event.preventDefault();
    const main = document.getElementById('main-content');

    if (main) {
      this.focus.focus(main);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuToggle()?.nativeElement.focus();
    }
  }
}
