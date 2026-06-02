import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-all-talks-page',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, TranslatePipe],
  template: `
    <section id="/charlas" class="section section--warm talks-page" aria-labelledby="all-talks-title">
      <app-section-heading
        [eyebrow]="'talks.eyebrow' | t"
        [title]="'talks.allTalksTitle' | t"
        headingId="all-talks-title"
        level="h1"
        [description]="'talks.allTalksDescription' | t"
      />

      <div class="talks-page__actions">
        <a class="button button--secondary" routerLink="/" fragment="charlas">{{ 'talks.backToHighlights' | t }}</a>
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
              <div class="talk-card__carousel" role="group" [attr.aria-label]="'a11y.talkImages' | t">
                <img
                  [src]="currentTalkImage(talk).src"
                  width="420"
                  height="263"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  aria-hidden="true"
                >
                @if (talkImages(talk).length > 1) {
                  <div class="talk-card__carousel-controls">
                    <button
                      type="button"
                      (click)="previousTalkImage(talk.title, talkImages(talk).length)"
                      [attr.aria-label]="'a11y.previousTalkImage' | t"
                    >
                      {{ 'talks.previous' | t }}
                    </button>
                    <span aria-live="polite">
                      {{ currentTalkImageIndex(talk.title) + 1 }} / {{ talkImages(talk).length }}
                    </span>
                    <button
                      type="button"
                      (click)="nextTalkImage(talk.title, talkImages(talk).length)"
                      [attr.aria-label]="'a11y.nextTalkImage' | t"
                    >
                      {{ 'talks.next' | t }}
                    </button>
                  </div>
                }
              </div>
              <div class="talk-card__body">
                <p class="meta">{{ talk.event }} · {{ talk.date | t }}</p>
                <div class="talk-card__type-badge">{{ getTypeLabel(talk.type) }}</div>
                <h3>{{ talk.title | t }}</h3>
                <p class="talk-card__description" [class.is-expanded]="isDescriptionExpanded(talk.title)">
                  {{ talk.description | t }}
                </p>
                @if (hasLongDescription(talk.description | t)) {
                  <button
                    type="button"
                    class="talk-card__description-toggle"
                    (click)="toggleDescription(talk.title)"
                    [attr.aria-expanded]="isDescriptionExpanded(talk.title)"
                  >
                    {{ isDescriptionExpanded(talk.title) ? ('common.viewLess' | t) : ('common.viewMore' | t) }}
                  </button>
                }
                <div class="tags" role="list" [attr.aria-label]="'a11y.talkTopics' | t">
                  @for (topic of talk.topics; track topic) {
                    <span role="listitem">{{ topic | t }}</span>
                  }
                </div>
                @if (talk.url) {
                  <div class="card-actions">
                    <a [href]="talk.url">
                      {{ 'talks.viewEvent' | t }}<span class="sr-only"> {{ 'a11y.openTalkNewTab' | t: { title: (talk.title | t) } }}</span>
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
      min-height: 44px;
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--color-primary-strong);
      background: var(--color-surface);
      color: var(--color-primary-strong);
      border-radius: 2rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      min-width: 120px;
      text-align: center;
    }

    .filter-button:hover {
      background: var(--color-primary-strong);
      color: var(--color-surface);
      box-shadow: 0 4px 12px rgba(217, 70, 239, 0.25);
    }

    .filter-button:focus-visible {
      outline: 3px solid var(--focus-ring);
      outline-offset: 2px;
    }

    .filter-button.active {
      background: var(--color-primary-strong);
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
      background: #4c1d95;
      color: #ffffff;
      padding: 0.35rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: 0;
    }

    @media (prefers-contrast: more) {
      .filter-button {
        border: 2px solid currentColor;
        background: var(--color-surface);
        color: var(--color-primary-strong);
        box-shadow: none;
      }

      .filter-button:hover,
      .filter-button.active,
      .filter-button.active:hover {
        background: var(--color-primary-strong);
        color: var(--color-surface);
        box-shadow: none;
      }

      .talk-card__type-badge {
        border: 2px solid currentColor;
        background: var(--color-surface);
        color: var(--color-text);
      }
    }
  `]
})
export class AllTalksPageComponent {
  readonly i18n = inject(I18nService);
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
    const key = `talks.filters.${filter}`;
    return this.i18n.translate(key);
  }

  getTypeLabel(type: string): string {
    const key = `talks.types.${type}`;
    return this.i18n.translate(key);
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
            alt: this.i18n.translateWithParams('a11y.talkImageAlt', { title: this.i18n.translate(talk.title), event: talk.event })
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
    return Number(this.i18n.translate(date).match(/\d{4}/)?.[0] ?? 0);
  }
}
