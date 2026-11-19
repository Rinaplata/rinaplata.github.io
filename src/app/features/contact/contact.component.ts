import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../data/profile.data';
import { SocialIconComponent } from '../../shared/components/social-icon.component';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const REASONS = ['talk', 'collaboration', 'mentoring', 'other'] as const;
type Reason = typeof REASONS[number];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, SocialIconComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <section class="section contact" id="contacto" tabindex="-1" aria-labelledby="contact-title">
      <div class="contact-card">
        <div class="contact-card__intro">
          <span class="section-heading__eyebrow">{{ 'contact.eyebrow' | t }}</span>
          <h2 id="contact-title">
            {{ 'contact.headline.before' | t }}
            <span class="accent">{{ 'contact.headline.accent' | t }}</span>
            {{ 'contact.headline.after' | t }}
          </h2>
          <p>{{ 'contact.description' | t }}</p>

          <div class="contact-card__email">
            <a [href]="'mailto:' + profile.email">{{ profile.email }}</a>
            <button type="button" class="button contact-card__copy" (click)="copyEmail()">
              {{ 'contact.copy' | t }}
            </button>
            <p class="contact-card__copied" aria-live="polite">{{ copied() ? ('contact.copiedAnnouncement' | t) : '' }}</p>
          </div>

          <ul class="contact-socials" id="redes-sociales" [attr.aria-label]="'a11y.contactChannels' | t">
            @for (social of profile.socials; track social.url) {
              <li>
                <a [href]="social.url">
                  <span class="contact-socials__icon" aria-hidden="true">
                    <app-social-icon [name]="social.icon" />
                  </span>
                  {{ social.label }}
                </a>
              </li>
            }
            <li>
              <a routerLink="/cv">
                <span class="contact-socials__icon" aria-hidden="true">
                  <app-social-icon name="external" />
                </span>
                {{ 'contact.cv' | t }}
              </a>
            </li>
          </ul>
        </div>

        <form class="contact-form" (ngSubmit)="openEmail()" novalidate>
          <fieldset class="contact-form__reasons">
            <legend>{{ 'contact.form.reason' | t }}</legend>
            <div class="contact-form__chips">
              @for (option of reasons; track option) {
                <label class="chip">
                  <input type="radio" name="reason" [value]="option" [(ngModel)]="reason">
                  <span>{{ 'contact.form.reasons.' + option | t }}</span>
                </label>
              }
            </div>
          </fieldset>

          <fieldset class="contact-form__details">
            <legend class="sr-only">{{ 'contact.form.details' | t }}</legend>

          <div class="field">
            <label for="contact-name">{{ 'contact.form.name' | t }}</label>
            <input id="contact-name" name="name" type="text" autocomplete="name" [(ngModel)]="name">
          </div>

          <div class="field">
            <label for="contact-message" id="contact-message-label">{{ 'contact.form.message' | t }} ({{ 'contact.form.required' | t }})</label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              aria-labelledby="contact-message-label"
              [(ngModel)]="message"
              [attr.aria-invalid]="showError() ? true : null"
              [attr.aria-describedby]="showError() ? 'contact-message-error' : 'contact-message-hint'"
            ></textarea>
            @if (showError()) {
              <p class="field__error" id="contact-message-error">{{ 'contact.form.error' | t }}</p>
            } @else {
              <p class="field__hint" id="contact-message-hint">{{ 'contact.form.hint' | t }}</p>
            }
          </div>

          </fieldset>

          <button type="submit" class="button button--primary">
            {{ 'contact.form.submit' | t }} <span class="button__arrow" aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly i18n = inject(I18nService);
  readonly profile = PROFILE;
  readonly reasons = REASONS;
  readonly copied = signal(false);
  readonly showError = signal(false);

  reason: Reason = 'talk';
  name = '';
  message = '';

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 3000);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }

  openEmail(): void {
    if (!this.message.trim()) {
      this.showError.set(true);
      document.getElementById('contact-message')?.focus();
      return;
    }

    this.showError.set(false);
    const subject = `${this.i18n.translate('contact.form.reasons.' + this.reason)} · ${this.name.trim() || this.profile.name}`;
    const body = this.name.trim() ? `${this.message.trim()}\n\n— ${this.name.trim()}` : this.message.trim();
    window.location.href = `mailto:${this.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
