import { Component, ElementRef, inject, signal, viewChild, viewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TALKS } from '../../data/talks.data';
import { Talk } from '../../models/portfolio.models';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

type TalkFilter = 'all' | Talk['type'];

@Component({
  selector: 'app-talks-gallery',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <section class="section talks-section" id="charlas" tabindex="-1" aria-labelledby="talks-title">
      <app-section-heading
        [eyebrow]="'talks.eyebrow' | t"
        [title]="'talks.title' | t"
        headingId="talks-title"
        [description]="'talks.description' | t"
      />

      <div class="talks-filters" role="group" [attr.aria-label]="'talks.filterLabel' | t">
        @for (filter of filters; track filter) {
          <button
            type="button"
            class="filter-button"
            [class.active]="activeFilter() === filter"
            [attr.aria-pressed]="activeFilter() === filter"
            (click)="setFilter(filter)"
          >
            {{ 'talks.filters.' + filter | t }}
            <span class="filter-button__count">{{ countFor(filter) }}</span>
          </button>
        }
      </div>

      <p class="sr-only" aria-live="polite">{{ announcement() }}</p>

      <div class="talk-explorer">
        <ul class="talk-explorer__list" [attr.aria-label]="'a11y.featuredTalks' | t" (keydown)="onListKeydown($event)">
          @for (talk of filteredTalks(); track talk.title; let index = $index) {
            <li>
              <button
                #tab
                type="button"
                class="talk-explorer__tab"
                [attr.aria-pressed]="index === selectedIndex()"
                aria-controls="talk-panel"
                (click)="select(index)"
              >
                <span class="talk-explorer__tab-meta">{{ talk.date | t }} · {{ 'talks.types.' + talk.type | t }}</span>
                <span class="talk-explorer__tab-title">{{ talk.title | t }}</span>
                <span class="talk-explorer__tab-event">{{ talk.event }}</span>
              </button>
            </li>
          }
        </ul>

        @if (selectedTalk(); as talk) {
          <div
            class="talk-explorer__panel"
            id="talk-panel"
            role="region"
            aria-labelledby="talk-panel-title"
          >
            <div class="talk-explorer__media">
              @if (playingVideo() && videoUrl(talk); as url) {
                <iframe
                  #videoFrame
                  [src]="url"
                  [title]="'talks.videoTitle' | t: { title: (talk.title | t) }"
                  width="720"
                  height="405"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              } @else {
                <img
                  [src]="talk.image"
                  width="720"
                  height="450"
                  decoding="async"
                  [alt]="'a11y.talkImageAlt' | t: { title: (talk.title | t), event: talk.event }"
                >
                @if (videoId(talk)) {
                  <button type="button" class="talk-explorer__play" (click)="playVideo()">
                    <span class="talk-explorer__play-icon" aria-hidden="true">▶</span>
                    {{ 'talks.playVideo' | t }}
                  </button>
                }
              }
            </div>

            <div class="talk-explorer__body">
              <p class="meta">
                <span class="talk-card__type-badge">{{ 'talks.types.' + talk.type | t }}</span>
                {{ talk.event }} · {{ talk.date | t }}
              </p>
              <h3 id="talk-panel-title">{{ talk.title | t }}</h3>
              <p class="talk-explorer__description">{{ talk.description | t }}</p>
              <ul class="tags" [attr.aria-label]="'a11y.talkTopics' | t">
                @for (topic of talk.topics; track topic) {
                  <li>{{ topic | t }}</li>
                }
              </ul>

              <div class="talk-explorer__footer">
                <p class="talk-explorer__position" aria-hidden="true">
                  {{ selectedIndex() + 1 }} / {{ filteredTalks().length }}
                </p>
                <div class="talk-explorer__nav">
                  <button
                    type="button"
                    class="icon-button"
                    (click)="step(-1)"
                    [attr.aria-label]="'talks.previousTalk' | t"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    class="icon-button"
                    (click)="step(1)"
                    [attr.aria-label]="'talks.nextTalk' | t"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                  @if (talk.url) {
                    <a class="button button--primary" [href]="talk.url">
                      {{ 'talks.viewEvent' | t }}<span class="sr-only">: {{ talk.title | t }}</span>
                      <span class="button__arrow" aria-hidden="true">↗</span>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="talks-controls">
        <a class="button" routerLink="/charlas">
          {{ 'talks.viewMore' | t }}<span class="sr-only"> {{ 'a11y.separatePage' | t }}</span>
        </a>
      </div>
    </section>
  `
})
export class TalksGalleryComponent {
  private readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  private readonly videoFrame = viewChild<ElementRef<HTMLIFrameElement>>('videoFrame');
  private readonly videoUrls = new Map<string, SafeResourceUrl>();

  readonly talks = [...TALKS].sort((first, second) => this.getTalkYear(second.date) - this.getTalkYear(first.date));
  readonly filters: TalkFilter[] = ['all', 'speaker', 'panel', 'entrevista', 'hackathon'];
  readonly activeFilter = signal<TalkFilter>('all');
  readonly selectedIndex = signal(0);
  readonly playingVideo = signal(false);
  readonly announcement = signal('');

  filteredTalks(): Talk[] {
    const filter = this.activeFilter();
    return filter === 'all' ? this.talks : this.talks.filter(talk => talk.type === filter);
  }

  selectedTalk(): Talk | undefined {
    return this.filteredTalks()[this.selectedIndex()];
  }

  countFor(filter: TalkFilter): number {
    return filter === 'all' ? this.talks.length : this.talks.filter(talk => talk.type === filter).length;
  }

  setFilter(filter: TalkFilter): void {
    this.activeFilter.set(filter);
    this.selectedIndex.set(0);
    this.playingVideo.set(false);
    this.announcement.set(this.i18n.translateWithParams('talks.resultsCount', { count: this.filteredTalks().length }));
  }

  select(index: number, moveFocus = false): void {
    const total = this.filteredTalks().length;
    const next = (index + total) % total;
    this.selectedIndex.set(next);
    this.playingVideo.set(false);
    this.announcement.set(
      this.i18n.translateWithParams('talks.nowShowing', { title: this.i18n.translate(this.filteredTalks()[next].title) })
    );

    if (moveFocus) {
      queueMicrotask(() => this.tabs()[next]?.nativeElement.focus());
    }
  }

  playVideo(): void {
    this.playingVideo.set(true);
    window.setTimeout(() => this.videoFrame()?.nativeElement.focus());
  }

  step(direction: 1 | -1): void {
    this.select(this.selectedIndex() + direction);
  }

  onListKeydown(event: KeyboardEvent): void {
    const keys: Record<string, () => number> = {
      ArrowDown: () => this.selectedIndex() + 1,
      ArrowUp: () => this.selectedIndex() - 1,
      Home: () => 0,
      End: () => this.filteredTalks().length - 1
    };

    if (keys[event.key]) {
      event.preventDefault();
      this.select(keys[event.key](), true);
    }
  }

  videoId(talk: Talk): string | null {
    const match = talk.url?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/);
    return match ? match[1] : null;
  }

  videoUrl(talk: Talk): SafeResourceUrl | null {
    const id = this.videoId(talk);

    if (!id) {
      return null;
    }

    if (!this.videoUrls.has(id)) {
      this.videoUrls.set(
        id,
        this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`)
      );
    }

    return this.videoUrls.get(id)!;
  }

  private getTalkYear(date: string): number {
    return Number(this.i18n.translate(date).match(/\d{4}/)?.[0] ?? 0);
  }
}
