import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROFILE } from '../../data/profile.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { SocialIconComponent } from '../../shared/components/social-icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SectionHeadingComponent, SocialIconComponent],
  template: `
    <section class="section contact" id="contacto" aria-labelledby="contact-title">
      <app-section-heading
        eyebrow="Contacto"
        title="Hablemos de tecnología, comunidad o colaboración"
        headingId="contact-title"
        description="Puedes escribirme por correo, LinkedIn o dejar preparado tu mensaje."
      />

      <div class="contact__grid">
        <form class="contact-form" aria-label="Formulario de contacto" (ngSubmit)="submit()">
          <label>
            Nombre
            <input type="text" name="name" autocomplete="name" [(ngModel)]="form.name" required>
          </label>

          <label>
            Correo
            <input type="email" name="email" autocomplete="email" [(ngModel)]="form.email" required>
          </label>

          <label>
            Mensaje
            <textarea name="message" rows="6" [(ngModel)]="form.message" required></textarea>
          </label>

          <button class="button button--primary" type="submit">Preparar correo</button>
        </form>

        <aside class="contact-card" aria-label="Enlaces de contacto">
          <h3>Encuéntrame en</h3>
          <a [href]="'mailto:' + profile.email">
            <app-social-icon name="mail" />
            <span>{{ profile.email }}</span>
          </a>
          @for (social of profile.socials; track social.url) {
            <a [href]="social.url" target="_blank" rel="noreferrer">
              <app-social-icon [name]="social.icon" />
              <span>{{ social.label }}</span>
            </a>
          }
          <a [href]="profile.cv" target="_blank">
            <app-social-icon name="external" />
            <span>Ver CV</span>
          </a>
        </aside>
      </div>
    </section>
  `
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly form = {
    name: '',
    email: '',
    message: ''
  };

  submit(): void {
    const subject = encodeURIComponent(`Contacto desde portafolio - ${this.form.name}`);
    const body = encodeURIComponent(`${this.form.message}\n\n${this.form.name}\n${this.form.email}`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
