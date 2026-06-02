import { Component, inject } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { SocialIconComponent } from '../../shared/components/social-icon.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SocialIconComponent, TranslatePipe],
  template: `
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="hero__content reveal">
        <span class="eyebrow">{{ 'hero.eyebrow' | t }}</span>
        <h1 id="hero-title">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.roleKey | t }}</p>
        <p class="hero__description">
          {{ 'hero.description' | t }}
        </p>
        <ul class="hero__actions" [attr.aria-label]="'a11y.primaryActions' | t">
          <li>
            <a class="button button--primary" href="#proyectos" (click)="scrollToSection('proyectos', $event)">{{ 'hero.cta.projects' | t }}</a>
          </li>
          <li>
            <a class="button button--secondary" href="#charlas" (click)="scrollToSection('charlas', $event)">{{ 'hero.cta.talks' | t }}</a>
          </li>
          <li>
            <a class="button button--ghost" href="#contacto" (click)="scrollToSection('contacto', $event)">{{ 'hero.cta.contact' | t }}</a>
          </li>
        </ul>

        <ul class="hero__socials" [attr.aria-label]="'a11y.socialLinks' | t">
          @for (social of profile.socials; track social.url) {
            <li>
              <a [href]="social.url" target="_blank" rel="noreferrer">
                <app-social-icon [name]="social.icon" />
                <span class="sr-only">{{ social.label }} {{ 'contact.newTab' | t }}</span>
              </a>
            </li>
          }
        </ul>
      </div>

      <div class="hero__visual reveal">
        <div class="hero__photo-card">
          <img
            src="assets/images/optimized/perfil-560.jpg"
            width="520"
            height="520"
            fetchpriority="high"
            decoding="async"
            alt=""
            aria-hidden="true"
          >
        </div>
        <div class="hero__floating-card hero__floating-card--top">
          <strong>{{ 'hero.frontendCard' | t }}</strong>
          <span>{{ 'hero.frontendStack' | t }}</span>
        </div>
        <div class="hero__floating-card hero__floating-card--bottom">
          <strong>{{ 'hero.communityCard' | t }}</strong>
          <span>{{ 'hero.communityStack' | t }}</span>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly i18n = inject(I18nService);

  scrollToSection(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    this.scrollWhenReady(fragment);
  }

  private scrollWhenReady(fragment: string, attempts = 0): void {
    const target = document.getElementById(fragment);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${fragment}`);
      return;
    }

    if (attempts < 40) {
      window.setTimeout(() => this.scrollWhenReady(fragment, attempts + 1), 75);
    }
  }
}
