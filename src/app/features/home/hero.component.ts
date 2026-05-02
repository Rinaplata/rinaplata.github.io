import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { SocialIconComponent } from '../../shared/components/social-icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SocialIconComponent],
  template: `
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="hero__content reveal">
        <p class="eyebrow">Frontend · Accesibilidad · Comunidad · Identidad Wayuu</p>
        <h1 id="hero-title">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <p class="hero__description">
          Construyo experiencias web modernas y accesibles, conectando tecnología,
          inclusión, liderazgo femenino y comunidades indígenas de Colombia.
        </p>
        <div class="hero__actions" aria-label="Acciones principales">
          <a class="button button--primary" href="#proyectos">Ver proyectos</a>
          <a class="button button--secondary" href="#charlas">Ver charlas</a>
          <a class="button button--ghost" href="#contacto">Contactarme</a>
        </div>

        <div class="hero__socials" aria-label="Redes sociales">
          @for (social of profile.socials; track social.url) {
            <a [href]="social.url" target="_blank" rel="noreferrer" [attr.aria-label]="social.label">
              <app-social-icon [name]="social.icon" />
            </a>
          }
        </div>
      </div>

      <div class="hero__visual reveal">
        <div class="hero__photo-card">
          <img
            src="assets/images/perfil.png"
            width="520"
            height="520"
            alt="Retrato profesional de Rina Plata"
          >
        </div>
        <div class="hero__floating-card hero__floating-card--top">
          <strong>Frontend</strong>
          <span>Angular · React · Accesibilidad</span>
        </div>
        <div class="hero__floating-card hero__floating-card--bottom">
          <strong>Comunidad</strong>
          <span>Tecnología e inclusión</span>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly profile = PROFILE;
}
