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
        <span class="eyebrow">Frontend · Accesibilidad · Comunidad · Identidad Wayuu</span>
        <h1 id="hero-title">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <p class="hero__description">
          Construyo experiencias web modernas y accesibles, conectando tecnología,
          inclusión, liderazgo femenino y comunidades indígenas de Colombia.
        </p>
        <div class="hero__actions" role="group" aria-label="Acciones principales">
          <a class="button button--primary" href="#proyectos" (click)="scrollToSection('proyectos', $event)">Ver proyectos</a>
          <a class="button button--secondary" href="#charlas" (click)="scrollToSection('charlas', $event)">Ver charlas</a>
          <a class="button button--ghost" href="#redes-sociales" (click)="scrollToSection('redes-sociales', $event)">Contactarme</a>
        </div>

        <div class="hero__socials" role="group" aria-label="Redes sociales">
          @for (social of profile.socials; track social.url) {
            <a [href]="social.url" target="_blank" rel="noreferrer">
              <app-social-icon [name]="social.icon" />
              <span class="sr-only">{{ social.label }} se abre en una nueva pestaña</span>
            </a>
          }
        </div>
      </div>

      <div class="hero__visual reveal">
        <div class="hero__photo-card">
          <img
            src="assets/images/optimized/perfil-560.jpg"
            width="520"
            height="520"
            fetchpriority="high"
            decoding="async"
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
