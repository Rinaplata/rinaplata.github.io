import { Component, inject } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { SocialIconComponent } from '../../shared/components/social-icon.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionHeadingComponent, SocialIconComponent, TranslatePipe],
  template: `
    <section class="section contact" id="contacto" aria-labelledby="contact-title">
      <app-section-heading
        [eyebrow]="'contact.eyebrow' | t"
        [title]="'contact.title' | t"
        headingId="contact-title"
        [description]="'contact.description' | t"
      />

      <ul class="contact-socials" id="redes-sociales" [attr.aria-label]="'a11y.contactChannels' | t">
        <li>
          <a [href]="'mailto:' + profile.email">
            <span class="contact-socials__icon" aria-hidden="true">
              <app-social-icon name="mail" />
            </span>
            <span class="contact-socials__content">
              <span class="contact-socials__title">{{ 'contact.email' | t }}</span>
              <span class="contact-socials__action">{{ 'contact.sendMessage' | t }}</span>
            </span>
          </a>
        </li>
        @for (social of profile.socials; track social.url) {
          <li>
            <a [href]="social.url" target="_blank" rel="noreferrer">
              <span class="contact-socials__icon" aria-hidden="true">
                <app-social-icon [name]="social.icon" />
              </span>
              <span class="contact-socials__content">
                <span class="contact-socials__title">{{ social.label }}</span>
                <span class="contact-socials__action">{{ 'contact.openLink' | t }}<span class="sr-only"> {{ 'contact.newTab' | t }}</span></span>
              </span>
            </a>
          </li>
        }
        <li>
          <a class="contact-socials__download" [href]="profile.cv" download>
            <span class="contact-socials__icon" aria-hidden="true">
              <app-social-icon name="download" />
            </span>
            <span class="contact-socials__content">
              <span class="contact-socials__title">{{ 'contact.cv' | t }}</span>
              <span class="contact-socials__action">{{ 'contact.downloadPDF' | t }}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  `
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly i18n = inject(I18nService);
}
