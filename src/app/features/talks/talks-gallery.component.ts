import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-talks-gallery',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent],
  template: `
    <section class="section section--warm" id="charlas" aria-labelledby="talks-title">
      <app-section-heading
        eyebrow="Charlas y eventos"
        title="Speaker en tecnología, comunidad e inclusión"
        headingId="talks-title"
        description="Conferencias, paneles, entrevistas y podcasts sobre frontend, accesibilidad, identidad y liderazgo."
      />

      <div class="talks-layout" aria-label="Charlas destacadas">
        @for (talk of featuredTalks; track talk.title) {
          <article class="talk-card talk-card--featured">
            <img [src]="talk.image" width="420" height="260" loading="lazy" [alt]="'Imagen relacionada con ' + talk.title">
            <div class="talk-card__body">
              <p class="meta">{{ talk.event }} · {{ talk.date }}</p>
              <h3>{{ talk.title }}</h3>
              <p>{{ talk.description }}</p>
              <div class="tags">
                @for (topic of talk.topics; track topic) {
                  <span>{{ topic }}</span>
                }
              </div>
              @if (talk.url) {
                <div class="card-actions">
                  <a [href]="talk.url" target="_blank" rel="noreferrer">Ver evento</a>
                </div>
              }
            </div>
          </article>
        }
      </div>

      <div class="talks-more">
        <a
          class="button button--secondary"
          routerLink="/charlas"
        >
          Ver todas las charlas
        </a>
      </div>
    </section>
  `
})
export class TalksGalleryComponent {
  readonly talks = TALKS;
  readonly featuredTalks = TALKS.filter((talk) =>
    ['JSConf', 'CaribeConf', 'CI&T Tech Café', 'PionerasConf', 'Kubernetes Community Days Colombia', 'BoyaConf / JSConf'].includes(talk.event)
  );
}
