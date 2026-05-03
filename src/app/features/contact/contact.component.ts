import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { SocialIconComponent } from '../../shared/components/social-icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionHeadingComponent, SocialIconComponent],
  template: `
    <section class="section contact" id="contacto" aria-labelledby="contact-title">
      <app-section-heading
        eyebrow="Contacto"
        title="Hablemos de tecnología, comunidad o colaboración"
        headingId="contact-title"
        description="Conversemos por mis canales principales para colaborar, construir comunidad o compartir ideas."
      />

      <div class="contact-socials" role="group" aria-label="Canales de contacto">
        <a [href]="'mailto:' + profile.email">
          <span class="contact-socials__icon" aria-hidden="true">
            <app-social-icon name="mail" />
          </span>
          <span class="contact-socials__content">
            <span class="contact-socials__title">Correo</span>
            <span class="contact-socials__action">Enviar mensaje</span>
          </span>
        </a>
        @for (social of profile.socials; track social.url) {
          <a [href]="social.url" target="_blank" rel="noreferrer">
            <span class="contact-socials__icon" aria-hidden="true">
              <app-social-icon [name]="social.icon" />
            </span>
            <span class="contact-socials__content">
              <span class="contact-socials__title">{{ social.label }}</span>
              <span class="contact-socials__action">Abrir enlace<span class="sr-only"> en una nueva pestaña</span></span>
            </span>
          </a>
        }
        <a class="contact-socials__download" [href]="profile.cv" download>
          <span class="contact-socials__icon" aria-hidden="true">
            <app-social-icon name="download" />
          </span>
          <span class="contact-socials__content">
            <span class="contact-socials__title">Currículo</span>
            <span class="contact-socials__action">Descargar PDF</span>
          </span>
        </a>
      </div>
    </section>
  `
})
export class ContactComponent {
  readonly profile = PROFILE;
}
