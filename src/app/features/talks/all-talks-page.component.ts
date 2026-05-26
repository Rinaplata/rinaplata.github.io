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

      <div class="talks-filters">
        @for (filterType of filterTypes; track filterType) {
          <button
            [class.active]="activeFilter === filterType"
            (click)="setFilter(filterType)"
            class="filter-button"
            [attr.aria-pressed]="activeFilter === filterType"
          >
            {{ getFilterLabel(filterType) }}
          </button>
        }
      </div>

      <div class="talks-all talks-all--page">
        <div class="talks-list">
          @for (talk of filteredTalks; track talk.title) {
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
                <div class="talk-card__type-badge">{{ getTypeLabel(talk.type) }}</div>
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
  `,
  styles: [`
    .talks-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 2rem 0;
      justify-content: center;
    }

    .filter-button {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--color-primary);
      background: var(--color-surface);
      color: var(--color-primary);
      border-radius: 2rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.3s ease;
      text-transform: capitalize;
      min-width: 120px;
      text-align: center;
    }

    .filter-button:hover {
      background: var(--color-primary);
      color: var(--color-surface);
      box-shadow: 0 4px 12px rgba(217, 70, 239, 0.25);
    }

    .filter-button:focus-visible {
      outline: 3px solid var(--focus-ring);
      outline-offset: 2px;
    }

    .filter-button.active {
      background: var(--color-primary);
      color: var(--color-surface);
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(217, 70, 239, 0.35);
    }

    .filter-button.active:hover {
      background: var(--color-primary-strong);
      box-shadow: 0 6px 16px rgba(107, 33, 168, 0.4);
    }

    .talk-card__type-badge {
      display: inline-block;
      background: var(--color-accent);
      color: var(--color-deep);
      padding: 0.35rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      letter-spacing: 0.5px;
    }
  `]
})
export class AllTalksPageComponent {
  readonly talks = [...TALKS].sort((firstTalk, secondTalk) => this.getTalkYear(secondTalk.date) - this.getTalkYear(firstTalk.date));
  readonly expandedDescriptions = new Set<string>();
  readonly filterTypes: Array<'all' | 'speaker' | 'panel' | 'entrevista' | 'hackathon'> = ['all', 'speaker', 'panel', 'entrevista', 'hackathon'];
  activeFilter: 'all' | 'speaker' | 'panel' | 'entrevista' | 'hackathon' = 'all';
  private readonly imageIndexes = new Map<string, number>();

  get filteredTalks() {
    if (this.activeFilter === 'all') {
      return this.talks;
    }
    return this.talks.filter(talk => talk.type === this.activeFilter);
  }

  setFilter(filter: 'all' | 'speaker' | 'panel' | 'entrevista' | 'hackathon'): void {
    this.activeFilter = filter;
  }

  getFilterLabel(filter: string): string {
    const labels: Record<string, string> = {
      'all': 'Todas',
      'speaker': 'Speakers',
      'panel': 'Paneles',
      'entrevista': 'Entrevistas',
      'hackathon': 'Hackathon'
    };
    return labels[filter] || filter;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'speaker': 'Speaker',
      'panel': 'Panel',
      'entrevista': 'Entrevista',
      'hackathon': 'Hackathon'
    };
    return labels[type] || type;
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
