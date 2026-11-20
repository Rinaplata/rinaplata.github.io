import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb.component';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const GLOSSARY = ['wayuu', 'wayuunaiki', 'manta', 'accessibility', 'screenReader', 'frontend', 'speaker', 'hackathon', 'mediapipe', 'webgazer', 'speechApi'];
const ABBREVIATIONS = ['wcag', 'ia', 'ux', 'api', 'uoc', 'pdf', 'html', 'css', 'wids'];
const CRITERIA = [
  { code: '1.4.6', key: 'contrast', status: 'meets' },
  { code: '1.4.8', key: 'presentation', status: 'meets' },
  { code: '1.4.9', key: 'imagesOfText', status: 'meets' },
  { code: '2.1.3', key: 'keyboard', status: 'meets' },
  { code: '2.3.3', key: 'motion', status: 'meets' },
  { code: '2.4.8', key: 'location', status: 'meets' },
  { code: '2.4.9', key: 'linkPurpose', status: 'meets' },
  { code: '2.4.10', key: 'headings', status: 'meets' },
  { code: '2.4.12', key: 'focusNotObscured', status: 'meets' },
  { code: '2.4.13', key: 'focusAppearance', status: 'meets' },
  { code: '2.5.5', key: 'targetSize', status: 'meets' },
  { code: '3.1.3', key: 'unusualWords', status: 'meets' },
  { code: '3.1.4', key: 'abbreviations', status: 'meets' },
  { code: '3.1.5', key: 'readingLevel', status: 'meets' },
  { code: '3.1.6', key: 'pronunciation', status: 'meets' },
  { code: '3.2.5', key: 'changeOnRequest', status: 'meets' },
  { code: '3.3.5', key: 'help', status: 'meets' },
  { code: '3.3.6', key: 'errorPrevention', status: 'meets' },
  { code: '1.2.6 – 1.2.8', key: 'video', status: 'partial' },
  { code: '1.2.9, 1.4.7, 2.2.3 – 2.2.6, 3.3.9', key: 'notApplicable', status: 'na' }
];

@Component({
  selector: 'app-accessibility-page',
  standalone: true,
  imports: [BreadcrumbComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <article class="cv a11y-page" aria-labelledby="a11y-title">
      <app-breadcrumb current="pageTitles.accessibilityShort" />

      <header class="cv__header">
        <h1 id="a11y-title">{{ 'accessibilityPage.title' | t }}</h1>
        <p class="cv__summary">{{ 'accessibilityPage.intro' | t }}</p>
      </header>

      <section class="cv__section" aria-labelledby="a11y-preferences">
        <h2 id="a11y-preferences">{{ 'accessibilityPage.preferences.title' | t }}</h2>
        <p>{{ 'accessibilityPage.preferences.description' | t }}</p>
        <ul class="cv__list">
          <li>{{ 'accessibilityPage.preferences.items.0' | t }}</li>
          <li>{{ 'accessibilityPage.preferences.items.1' | t }}</li>
          <li>{{ 'accessibilityPage.preferences.items.2' | t }}</li>
          <li>{{ 'accessibilityPage.preferences.items.3' | t }}</li>
          <li>{{ 'accessibilityPage.preferences.items.4' | t }}</li>
        </ul>
      </section>

      <section class="cv__section" aria-labelledby="a11y-glossary">
        <h2 id="a11y-glossary">{{ 'accessibilityPage.glossary.title' | t }}</h2>
        <p>{{ 'accessibilityPage.glossary.description' | t }}</p>
        <dl class="glossary">
          @for (term of glossary; track term) {
            <div>
              <dt [id]="'glosario-' + term">
                <dfn>{{ 'accessibilityPage.glossary.terms.' + term + '.term' | t }}</dfn>
                @if (('accessibilityPage.glossary.terms.' + term + '.pronunciation' | t) !== 'accessibilityPage.glossary.terms.' + term + '.pronunciation') {
                  <span class="glossary__pronunciation">
                    {{ 'accessibilityPage.glossary.pronunciationLabel' | t }}:
                    {{ 'accessibilityPage.glossary.terms.' + term + '.pronunciation' | t }}
                  </span>
                }
              </dt>
              <dd>{{ 'accessibilityPage.glossary.terms.' + term + '.definition' | t }}</dd>
            </div>
          }
        </dl>
      </section>

      <section class="cv__section" aria-labelledby="a11y-abbreviations">
        <h2 id="a11y-abbreviations">{{ 'accessibilityPage.abbreviations.title' | t }}</h2>
        <dl class="glossary">
          @for (item of abbreviations; track item) {
            <div>
              <dt [id]="'sigla-' + item">
                <abbr>{{ 'accessibilityPage.abbreviations.items.' + item + '.short' | t }}</abbr>
              </dt>
              <dd>{{ 'accessibilityPage.abbreviations.items.' + item + '.long' | t }}</dd>
            </div>
          }
        </dl>
      </section>

      <section class="cv__section" aria-labelledby="a11y-status">
        <h2 id="a11y-status">{{ 'accessibilityPage.status.title' | t }}</h2>
        <p>{{ 'accessibilityPage.status.description' | t }}</p>
        <div class="table-scroll" tabindex="0" role="region" [attr.aria-label]="'accessibilityPage.status.caption' | t">
          <table class="status-table">
            <caption class="sr-only">{{ 'accessibilityPage.status.caption' | t }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ 'accessibilityPage.status.criterion' | t }}</th>
                <th scope="col">{{ 'accessibilityPage.status.how' | t }}</th>
                <th scope="col">{{ 'accessibilityPage.status.state' | t }}</th>
              </tr>
            </thead>
            <tbody>
              @for (criterion of criteria; track criterion.code) {
                <tr>
                  <th scope="row">{{ criterion.code }}</th>
                  <td>{{ 'accessibilityPage.status.items.' + criterion.key | t }}</td>
                  <td>
                    <span class="status-badge" [class]="'status-badge status-badge--' + criterion.status">
                      {{ 'accessibilityPage.status.labels.' + criterion.status | t }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="cv__section" aria-labelledby="a11y-limits">
        <h2 id="a11y-limits">{{ 'accessibilityPage.limits.title' | t }}</h2>
        <ul class="cv__list">
          <li>{{ 'accessibilityPage.limits.items.0' | t }}</li>
          <li>{{ 'accessibilityPage.limits.items.1' | t }}</li>
          <li>{{ 'accessibilityPage.limits.items.2' | t }}</li>
        </ul>
      </section>

      <section class="cv__section" aria-labelledby="a11y-feedback">
        <h2 id="a11y-feedback">{{ 'accessibilityPage.feedback.title' | t }}</h2>
        <p>
          {{ 'accessibilityPage.feedback.description' | t }}
          <a [href]="'mailto:' + email">{{ email }}</a>.
        </p>
        <p class="cv__meta">{{ 'accessibilityPage.updated' | t }}</p>
      </section>
    </article>
  `
})
export class AccessibilityPageComponent {
  readonly glossary = GLOSSARY;
  readonly abbreviations = ABBREVIATIONS;
  readonly criteria = CRITERIA;
  readonly email = PROFILE.email;
}
