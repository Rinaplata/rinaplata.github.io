import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../services/theme.service';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Charlas', href: '#charlas' },
  { label: 'Comunidades', href: '#comunidades' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' }
];

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <a class="skip-link" href="#main-content">Saltar al contenido principal</a>

    <header class="site-header">
      <nav class="nav" aria-label="Navegación principal">
        <a class="brand" href="#inicio" (click)="closeMenu()">Rina Plata</a>

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
          @for (item of navItems; track item.href) {
            <a [href]="item.href" (click)="closeMenu()">{{ item.label }}</a>
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
