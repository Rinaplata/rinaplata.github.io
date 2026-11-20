import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../data/profile.data';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="footer">
      <p>© {{ currentYear }} {{ profile.name }}. {{ 'footer.builtWith' | t }}</p>
      <ul>
        <li><a routerLink="/accesibilidad">{{ 'footer.accessibility' | t }}</a></li>
        <li><a routerLink="/cv">{{ 'contact.cv' | t }}</a></li>
      </ul>
    </footer>
  `
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly currentYear = new Date().getFullYear();
}
