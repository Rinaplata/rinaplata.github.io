import { Component } from '@angular/core';
import { COMMUNITIES } from '../../data/communities.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section" id="comunidades" aria-labelledby="communities-title">
      <app-section-heading
        eyebrow="Comunidades"
        title="Liderazgo comunitario y redes de aprendizaje"
        headingId="communities-title"
        description="Espacios donde contribuyo desde mentoría, organización, charlas y representación."
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
                [alt]="'Logo de ' + community.name"
              >
            }
            <p class="meta">{{ community.role }}</p>
            <h3>{{ community.name }}</h3>
            <p>{{ community.description }}</p>
            <strong>Impacto</strong>
            <p>{{ community.impact }}</p>
            @if (community.url) {
              <div class="card-actions">
                <a [href]="community.url" target="_blank" rel="noreferrer">
                  Ver comunidad<span class="sr-only"> {{ community.name }} en una nueva pestaña</span>
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
}
