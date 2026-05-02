import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-all-talks-page',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent],
  template: `
    <section class="section section--warm talks-page" aria-labelledby="all-talks-title">
      <app-section-heading
        eyebrow="Archivo speaker"
        title="Todas las charlas, podcasts y entrevistas"
        headingId="all-talks-title"
        description="Un recorrido completo por conferencias, paneles, podcasts, artículos y encuentros comunitarios."
      />

      <div class="talks-page__actions">
        <a class="button button--secondary" routerLink="/" fragment="charlas">Volver a destacadas</a>
      </div>

      <div class="talks-all talks-all--page">
        <div class="talks-list">
          @for (talk of talks; track talk.title) {
            <article class="talk-card talk-card--compact">
              <img [src]="talk.image" width="220" height="140" loading="lazy" [alt]="'Imagen relacionada con ' + talk.title">
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
      </div>
    </section>
  `
})
export class AllTalksPageComponent {
  readonly talks = TALKS;
}
