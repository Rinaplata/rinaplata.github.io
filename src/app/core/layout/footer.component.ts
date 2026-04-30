import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { SocialIconComponent } from '../../shared/components/social-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialIconComponent],
  template: `
    <footer class="footer">
      <p>© {{ currentYear }} {{ profile.name }}. Construido con Angular, accesibilidad y comunidad.</p>
      <div class="footer__links" aria-label="Redes sociales">
        @for (social of profile.socials; track social.url) {
          <a [href]="social.url" target="_blank" rel="noreferrer">
            <app-social-icon [name]="social.icon" />
            <span>{{ social.label }}</span>
          </a>
        }
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly currentYear = new Date().getFullYear();
}
