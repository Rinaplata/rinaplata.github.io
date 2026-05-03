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
          (click)="theme.toggle()"
        >
          {{ theme.isDark() ? 'Claro' : 'Oscuro' }}
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
