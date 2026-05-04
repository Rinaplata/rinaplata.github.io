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
              <div class="talk-card__carousel" role="group" aria-label="Imágenes de la charla">
                <img
                  [src]="currentTalkImage(talk).src"
                  width="420"
                  height="263"
                  loading="lazy"
                  decoding="async"
                  [alt]="currentTalkImage(talk).alt"
                >
                @if (talkImages(talk).length > 1) {
                  <div class="talk-card__carousel-controls">
                    <button
                      type="button"
                      (click)="previousTalkImage(talk.title, talkImages(talk).length)"
                      aria-label="Anterior: ver imagen anterior de la charla"
                    >
                      Anterior
                    </button>
                    <span aria-live="polite">
                      {{ currentTalkImageIndex(talk.title) + 1 }} / {{ talkImages(talk).length }}
                    </span>
                    <button
                      type="button"
                      (click)="nextTalkImage(talk.title, talkImages(talk).length)"
                      aria-label="Siguiente: ver siguiente imagen de la charla"
                    >
                      Siguiente
                    </button>
                  </div>
                }
              </div>
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
                <div class="tags" role="list" aria-label="Temas de la charla">
                  @for (topic of talk.topics; track topic) {
                    <span role="listitem">{{ topic }}</span>
                  }
                </div>
                @if (talk.url) {
                  <div class="card-actions">
                    <a [href]="talk.url" target="_blank" rel="noreferrer">
                      Ver evento<span class="sr-only"> de la charla {{ talk.title }} en una nueva pestaña</span>
                    </a>
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
  readonly talks = [...TALKS].sort((firstTalk, secondTalk) => this.getTalkYear(secondTalk.date) - this.getTalkYear(firstTalk.date));
  readonly expandedDescriptions = new Set<string>();
  private readonly imageIndexes = new Map<string, number>();

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

  talkImages(talk: typeof TALKS[number]) {
    return talk.images?.length
      ? talk.images
      : [
          {
            src: talk.image,
            alt: `Imagen de la charla ${talk.title} en ${talk.event}`
          }
        ];
  }

  currentTalkImageIndex(title: string): number {
    return this.imageIndexes.get(title) ?? 0;
  }

  currentTalkImage(talk: typeof TALKS[number]) {
    return this.talkImages(talk)[this.currentTalkImageIndex(talk.title)];
  }

  previousTalkImage(title: string, total: number): void {
    const current = this.currentTalkImageIndex(title);
    this.imageIndexes.set(title, (current - 1 + total) % total);
  }

  nextTalkImage(title: string, total: number): void {
    const current = this.currentTalkImageIndex(title);
    this.imageIndexes.set(title, (current + 1) % total);
  }

  private getTalkYear(date: string): number {
    return Number(date.match(/\d{4}/)?.[0] ?? 0);
  }
}
