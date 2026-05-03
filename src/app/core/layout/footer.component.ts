import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>© {{ currentYear }} {{ profile.name }}. Construido con Angular, accesibilidad y comunidad.</p>
    </footer>
  `
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly currentYear = new Date().getFullYear();
}
