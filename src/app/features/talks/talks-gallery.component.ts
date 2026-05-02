import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-talks-gallery',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent],
  template: `
    <section class="section section--warm talks-section" id="charlas" aria-labelledby="talks-title">
      <app-section-heading
        eyebrow="Charlas y eventos"
        title="Speaker en tecnología, comunidad e inclusión"
        headingId="talks-title"
        description="Conferencias, paneles, entrevistas y podcasts sobre frontend, accesibilidad, identidad y liderazgo."
      />

      <div class="talks-layout" aria-label="Charlas destacadas" aria-live="polite">
        @for (talk of visibleTalks; track talk.title) {
          <article class="talk-card talk-card--featured" tabindex="0">
            <img
              [src]="talk.image"
              width="420"
              height="263"
              loading="lazy"
              [alt]="'Imagen de la charla ' + talk.title + ' en ' + talk.event"
            >
            <div class="talk-card__body">
              <p class="meta">{{ talk.event }} · {{ talk.date }}</p>
              <h3>{{ talk.title }}</h3>
              <p class="talk-card__description" [class.is-expanded]="isDescriptionExpanded(talk.title)">
                {{ talk.description }}
              </p>
              @if (hasLongDescription(talk.description)) {
                <button
                  type="button"
                  class="talk-card__description-toggle"
                  (click)="toggleDescription(talk.title)"
                  [attr.aria-expanded]="isDescriptionExpanded(talk.title)"
                >
                  {{ isDescriptionExpanded(talk.title) ? 'Ver menos' : 'Ver más' }}
                </button>
              }
              <div class="tags">
                @for (topic of talk.topics; track topic) {
                  <span>{{ topic }}</span>
                }
              </div>
              @if (talk.url) {
                <div class="card-actions">
                  <a
                    [href]="talk.url"
                    target="_blank"
                    rel="noreferrer"
                    [attr.aria-label]="'Ver evento de la charla ' + talk.title"
                  >
                    Ver evento
                  </a>
                </div>
              }
            </div>
          </article>
        }
      </div>

      <div class="talks-controls">
        <a
          class="button button--secondary talks-more__button"
          routerLink="/charlas"
          aria-label="Ver todas las charlas en una página aparte"
        >
          Ver más charlas
        </a>
      </div>
    </section>
  `
})
export class TalksGalleryComponent {
  readonly talks = [...TALKS].sort((firstTalk, secondTalk) => this.getTalkYear(secondTalk.date) - this.getTalkYear(firstTalk.date));
  readonly visibleCount = 6;
  readonly expandedDescriptions = new Set<string>();

  get visibleTalks() {
    return this.talks.slice(0, this.visibleCount);
  }

  hasLongDescription(description: string): boolean {
    return description.length > 110;
  }

  isDescriptionExpanded(title: string): boolean {
    return this.expandedDescriptions.has(title);
  }

  toggleDescription(title: string): void {
    if (this.expandedDescriptions.has(title)) {
      this.expandedDescriptions.delete(title);
      return;
    }

    this.expandedDescriptions.add(title);
  }

  private getTalkYear(date: string): number {
    return Number(date.match(/\d{4}/)?.[0] ?? 0);
  }
}
