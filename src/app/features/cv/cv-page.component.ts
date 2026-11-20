import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EXPERIENCE } from '../../data/experience.data';
import { PROFILE } from '../../data/profile.data';
import { SKILLS } from '../../data/skills.data';
import { TALKS } from '../../data/talks.data';
import { I18nService } from '../../core/services/i18n.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb.component';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const CV_PDF = {
  es: 'assets/pdf/cv-rina-plata-es.pdf',
  en: 'assets/pdf/cv-rina-plata-en.pdf'
};

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <article class="cv" aria-labelledby="cv-title">
      <app-breadcrumb current="pageTitles.cvShort" />
      <div class="cv__actions">
        <a class="button" routerLink="/" fragment="contacto">
          <span class="button__arrow" aria-hidden="true">←</span> {{ 'cv.back' | t }}
        </a>
        <a class="button button--primary" [href]="pdfUrl()">
          {{ 'cv.downloadPdf' | t }} <span class="button__arrow" aria-hidden="true">↓</span>
        </a>
      </div>

      <header class="cv__header">
        <h1 id="cv-title">{{ profile.name }}</h1>
        <p class="cv__role">{{ profile.roleKey | t }}</p>
        <p class="cv__summary">{{ 'hero.description' | t }}</p>
        <ul class="cv__contact" [attr.aria-label]="'a11y.contactChannels' | t">
          <li>{{ 'cv.location' | t }}: {{ profile.location }}</li>
          <li><a [href]="'mailto:' + profile.email">{{ profile.email }}</a></li>
          <li><a href="https://www.linkedin.com/in/rina-plata/">linkedin.com/in/rina-plata</a></li>
          <li><a href="https://github.com/Rinaplata">github.com/Rinaplata</a></li>
          <li><a href="https://rinaplata.github.io">rinaplata.github.io</a></li>
        </ul>
      </header>

      <section class="cv__section" aria-labelledby="cv-experience">
        <h2 id="cv-experience">{{ 'cv.experience' | t }}</h2>
        @for (item of experience; track item.role + item.company) {
          <section class="cv__entry">
            <h3>{{ item.role | t }} · {{ item.company }}</h3>
            <p class="cv__meta">{{ item.period | t }} · {{ item.location | t }}</p>
            <ul>
              @for (responsibility of item.responsibilities; track responsibility) {
                <li>{{ responsibility | t }}</li>
              }
              @for (achievement of item.achievements; track achievement) {
                <li>{{ achievement | t }}</li>
              }
            </ul>
            <p class="cv__meta">
              <strong>{{ 'a11y.usedTechnologies' | t }}:</strong>
              @for (tech of item.technologies; track tech; let last = $last) {
                {{ tech | t }}{{ last ? '' : ', ' }}
              }
            </p>
          </section>
        }
      </section>

      <section class="cv__section" aria-labelledby="cv-education">
        <h2 id="cv-education">{{ 'cv.education' | t }}</h2>
        <section class="cv__entry">
          <h3>{{ 'achievements.items.master.title' | t }}</h3>
          <p class="cv__meta">Universitat Oberta de Catalunya (UOC) · {{ 'achievements.items.master.year' | t }}</p>
        </section>
        <section class="cv__entry">
          <h3>{{ 'cv.softwareEngineering' | t }}</h3>
          <p class="cv__meta">Tecnológico de Antioquia · 2020 - 2025</p>
        </section>
        <section class="cv__entry">
          <h3>{{ 'achievements.items.certifications.title' | t }}</h3>
          <p class="cv__meta">
            <a href="https://www.linkedin.com/in/rina-plata/details/certifications/">{{ 'achievements.items.certifications.urlLabel' | t }}</a>
          </p>
        </section>
      </section>

      <section class="cv__section" aria-labelledby="cv-skills">
        <h2 id="cv-skills">{{ 'cv.skills' | t }}</h2>
        <dl class="cv__skills">
          @for (group of skills; track group.category) {
            <div>
              <dt>{{ group.category | t }}</dt>
              <dd>
                @for (skill of group.skills; track skill; let last = $last) {
                  {{ skill | t }}{{ last ? '' : ', ' }}
                }
              </dd>
            </div>
          }
        </dl>
      </section>

      <section class="cv__section" aria-labelledby="cv-languages">
        <h2 id="cv-languages">{{ 'cv.languages' | t }}</h2>
        <p>{{ 'achievements.items.languages.description' | t }}</p>
      </section>

      <section class="cv__section" aria-labelledby="cv-talks">
        <h2 id="cv-talks">{{ 'cv.talks' | t }}</h2>
        <ul class="cv__list">
          @for (talk of talks; track talk.title) {
            <li><strong>{{ talk.title | t }}</strong> · {{ talk.event }}, {{ talk.date | t }}</li>
          }
        </ul>
      </section>

      <section class="cv__section" aria-labelledby="cv-awards">
        <h2 id="cv-awards">{{ 'cv.awards' | t }}</h2>
        <section class="cv__entry">
          <h3>{{ 'achievements.items.featured.title' | t }}</h3>
          <p class="cv__meta">Tecnológico de Antioquia · {{ 'achievements.items.featured.year' | t }}</p>
          <p>{{ 'achievements.items.featured.description' | t }}</p>
        </section>
      </section>
    </article>
  `
})
export class CvPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly language = toSignal(this.i18n.currentLanguage$, { initialValue: this.i18n.getCurrentLanguage() });

  readonly profile = PROFILE;
  readonly experience = EXPERIENCE;
  readonly skills = SKILLS;
  readonly talks = TALKS.filter(talk => talk.type === 'speaker');

  pdfUrl(): string {
    return CV_PDF[this.language()];
  }
}
