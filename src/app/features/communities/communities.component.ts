import { Component, inject } from '@angular/core';
import { COMMUNITIES } from '../../data/communities.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section" id="comunidades" aria-labelledby="communities-title">
      <app-section-heading
        [eyebrow]="'communities.eyebrow' | t"
        [title]="'communities.title' | t"
        headingId="communities-title"
        [description]="'communities.description' | t"
      />

      <div class="cards-grid cards-grid--three">
        @for (community of communities; track community.name) {
          <article class="card community-card">
            @if (community.image) {
              <img
                class="community-card__logo"
                [src]="community.image"
                width="88"
                height="88"
                loading="lazy"
                decoding="async"
                alt=""
                aria-hidden="true"
              >
            }
            <p class="meta">{{ community.role | t }}</p>
            <h3>{{ community.name }}</h3>
            <p>{{ community.description | t }}</p>
            <strong>{{ 'communities.impactLabel' | t }}</strong>
            <p>{{ community.impact | t }}</p>
            @if (community.url) {
              <div class="card-actions">
                <a [href]="community.url" target="_blank" rel="noreferrer">
                  {{ 'communities.viewCommunity' | t }}<span class="sr-only"> {{ 'a11y.communityNewTab' | t: { name: community.name } }}</span>
                </a>
              </div>
            }
          </article>
        }
      </div>
    </section>
  `
})
export class CommunitiesComponent {
  readonly communities = COMMUNITIES;
  readonly i18n = inject(I18nService);
}
