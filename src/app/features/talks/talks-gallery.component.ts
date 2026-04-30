import { Component } from '@angular/core';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-talks-gallery',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section section--warm" id="charlas" aria-labelledby="talks-title">
      <app-section-heading
        eyebrow="Charlas y eventos"
        title="Speaker en tecnología, comunidad e inclusión"
        headingId="talks-title"
        description="Una galería de conversaciones sobre frontend, accesibilidad, identidad y liderazgo."
      />

      <div class="gallery">
        @for (talk of talks; track talk.title) {
          <article class="talk-card">
            <img [src]="talk.image" width="420" height="260" loading="lazy" [alt]="'Imagen relacionada con la charla ' + talk.title">
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
    </section>
  `
})
export class TalksGalleryComponent {
  readonly talks = TALKS;
}
