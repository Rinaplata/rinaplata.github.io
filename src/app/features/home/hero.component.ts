import { Component, inject } from '@angular/core';
import { COMMUNITIES } from '../../data/communities.data';
import { PROFILE } from '../../data/profile.data';
import { TALKS } from '../../data/talks.data';
import { SocialIconComponent } from '../../shared/components/social-icon.component';
import { FocusService } from '../../core/services/focus.service';
import { I18nService } from '../../core/services/i18n.service';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SocialIconComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <p class="hero__status reveal">{{ 'hero.status' | t }}</p>

      <div class="hero__grid">
        <div class="hero__content reveal">
          <h1 id="hero-title">
            <span class="sr-only">{{ profile.name }}: </span>
            {{ 'hero.headline.before' | t }}
            <span class="accent">{{ 'hero.headline.accent' | t }}</span>
            {{ 'hero.headline.after' | t }}
          </h1>
          <p class="hero__description">{{ 'hero.description' | t }}</p>

          <ul class="hero__actions" [attr.aria-label]="'a11y.primaryActions' | t">
            <li>
              <a class="button button--primary" href="#/#charlas" (click)="scrollToSection('charlas', $event)">
                {{ 'hero.cta.talks' | t }} <span class="button__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a class="button" href="#/#contacto" (click)="scrollToSection('contacto', $event)">
                {{ 'hero.cta.contact' | t }} <span class="button__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>

          <ul class="hero__socials" [attr.aria-label]="'a11y.socialLinks' | t">
            @for (social of profile.socials; track social.url) {
              <li>
                <a [href]="social.url">
                  <app-social-icon [name]="social.icon" />
                  <span class="sr-only">{{ social.label }}</span>
                </a>
              </li>
            }
          </ul>
        </div>

        <figure class="hero__photo reveal reveal--delay">
          <img
            src="assets/images/rina/rina-hero-720.jpg"
            srcset="assets/images/rina/rina-hero-720.jpg 720w, assets/images/rina/rina-hero-1080.jpg 1080w"
            sizes="(max-width: 900px) 26rem, 420px"
            width="720"
            height="900"
            fetchpriority="high"
            decoding="async"
            [alt]="'hero.imageAlt' | t"
          >
          <figcaption>{{ 'hero.photoCaption' | t }}</figcaption>
        </figure>
      </div>

      <ul class="hero__stats reveal reveal--delay" [attr.aria-label]="'a11y.highlights' | t">
        <li>
          <strong>4+</strong>
          <span>{{ 'hero.stats.years' | t }}</span>
        </li>
        <li>
          <strong>{{ talksCount }}</strong>
          <span>{{ 'hero.stats.talks' | t }}</span>
        </li>
        <li>
          <strong>{{ communitiesCount }}</strong>
          <span>{{ 'hero.stats.communities' | t }}</span>
        </li>
      </ul>
    </section>
  `
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly i18n = inject(I18nService);
  private readonly focus = inject(FocusService);
  readonly talksCount = TALKS.length;
  readonly communitiesCount = COMMUNITIES.length;

  scrollToSection(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    this.focus.goToSection(fragment);
  }
}
