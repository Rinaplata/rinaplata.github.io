import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-talks-gallery',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section section--warm talks-section" id="charlas" aria-labelledby="talks-title">
      <app-section-heading
        [eyebrow]="'talks.eyebrow' | t"
        [title]="'talks.title' | t"
        headingId="talks-title"
        [description]="'talks.description' | t"
      />

      <div class="talks-layout" role="list" [attr.aria-label]="'a11y.featuredTalks' | t" aria-live="polite">
        @for (talk of visibleTalks; track talk.title) {
          <article class="talk-card talk-card--featured" role="listitem">
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
                  <a
                    [href]="talk.url"
                  >
                    {{ 'talks.viewEvent' | t }}<span class="sr-only"> {{ 'a11y.openTalkNewTab' | t: { title: (talk.title | t) } }}</span>
                  </a>
                </div>
              }
            </div>
          </article>
        }
      </div>

      <div class="talks-controls">
        <a
          id="/charlas"
          class="button button--secondary talks-more__button"
          routerLink="/charlas"
        >
          {{ 'talks.viewMore' | t }}<span class="sr-only"> {{ 'a11y.separatePage' | t }}</span>
        </a>
      </div>
    </section>
  `
})
export class TalksGalleryComponent {
  readonly i18n = inject(I18nService);
  readonly talks = [...TALKS].sort((firstTalk, secondTalk) => this.getTalkYear(secondTalk.date) - this.getTalkYear(firstTalk.date));
  readonly visibleCount = 6;
  readonly expandedDescriptions = new Set<string>();
  private readonly imageIndexes = new Map<string, number>();

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
