import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../services/theme.service';

const NAV_ITEMS = [
  { label: 'Inicio', fragment: 'inicio' },
  { label: 'Sobre mí', fragment: 'sobre-mi' },
  { label: 'Experiencia', fragment: 'experiencia' },
  { label: 'Charlas', fragment: 'charlas' },
  { label: 'Comunidades', fragment: 'comunidades' },
  { label: 'Proyectos', fragment: 'proyectos' },
  { label: 'Contacto', fragment: 'contacto' }
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <a class="skip-link" href="#main-content">Saltar al contenido principal</a>

      <nav class="nav" aria-label="Navegación principal">
        <a class="brand" routerLink="/" fragment="inicio" (click)="closeMenu()">Rina Plata</a>

        <button
          class="icon-button nav-toggle"
          type="button"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="main-menu"
          aria-label="Abrir o cerrar menú"
          (click)="menuOpen.set(!menuOpen())"
        >
          <span aria-hidden="true">{{ menuOpen() ? '×' : '☰' }}</span>
        </button>

        <div class="nav-panel" [class.is-open]="menuOpen()" id="main-menu">
          @for (item of navItems; track item.fragment) {
            <a routerLink="/" [fragment]="item.fragment" (click)="closeMenu()">{{ item.label }}</a>
          }
        </div>

        <button
          class="theme-toggle"
          type="button"
          [attr.aria-pressed]="theme.isDark()"
          [attr.aria-label]="theme.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
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
      </nav>
    </header>
  `
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  readonly navItems = NAV_ITEMS;
  readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
