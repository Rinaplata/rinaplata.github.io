import { Component, HostListener, inject } from '@angular/core';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section achievements-section" id="logros" aria-labelledby="achievements-title">
      <app-section-heading
        [eyebrow]="'achievements.eyebrow' | t"
        [title]="'achievements.title' | t"
        headingId="achievements-title"
        [description]="'achievements.description' | t"
      />

      <div class="achievements-layout">
        <article class="card achievement-card achievement-card--carousel achievement-card--featured">
          <div
            class="achievement-carousel"
            role="group"
            [attr.aria-label]="'a11y.achievementGroup' | t: { title: (featuredCard.title | t) }"
            (focusin)="setActiveCarousel(featuredCard.title)"
            (focusout)="clearActiveCarousel()"
            (touchstart)="onTouchStart($event)"
            (touchend)="onTouchEnd($event, featuredCard.title)"
          >
            <div
              class="achievement-carousel__track"
              [style.transform]="'translateX(-' + (currentSlideIndex(featuredCard.title) * 100) + '%)'"
            >
              <div class="achievement-carousel__slide" role="group" [attr.aria-label]="'a11y.achievementSlideText' | t">
                <span class="achievement-featured__badge">{{ 'achievements.featuredBadge' | t }}</span>
                <p class="meta">{{ featuredCard.year | t }}</p>
                <h3>{{ featuredCard.title | t }}</h3>
                <p>{{ featuredCard.description | t }}</p>
                @if (featuredCard.url) {
                  <div class="card-actions">
                    <a
                      [href]="featuredCard.url"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {{ (featuredCard.urlLabel || 'achievements.viewRecognition') | t }}<span class="sr-only">: {{ featuredCard.title | t }} {{ 'a11y.openNewTab' | t }}</span>
                    </a>
                  </div>
                }
              </div>
              <div class="achievement-carousel__slide achievement-carousel__slide--image" role="group" [attr.aria-label]="'a11y.achievementSlideImage' | t">
                <img
                  [src]="featuredCard.images![0].src"
                  width="640"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  [alt]="featuredCard.images![0].alt | t"
                >
              </div>
            </div>

            <div class="achievement-carousel__controls">
              <button
                class="achievement-carousel__arrow achievement-carousel__arrow--prev"
                type="button"
                (click)="previousSlide(featuredCard.title)"
                [disabled]="currentSlideIndex(featuredCard.title) === 0"
                [attr.aria-label]="'a11y.achievementText' | t"
              >
                ‹
              </button>
              <span aria-live="polite">
                {{ currentSlideIndex(featuredCard.title) + 1 }} / 2
              </span>
              <button
                class="achievement-carousel__arrow achievement-carousel__arrow--next"
                type="button"
                (click)="nextSlide(featuredCard.title)"
                [disabled]="currentSlideIndex(featuredCard.title) === 1"
                [attr.aria-label]="'a11y.achievementPhoto' | t"
              >
                ›
              </button>
            </div>
          </div>
        </article>

        <div class="achievement-secondary-list" role="list" [attr.aria-label]="'a11y.otherAchievements' | t">
          @for (achievement of secondaryCards; track achievement.title) {
          <article
            class="card achievement-card achievement-card--secondary"
            role="listitem"
          >
            <p class="meta">{{ achievement.year | t }}</p>
            <h3>{{ achievement.title | t }}</h3>
            <p>{{ achievement.description | t }}</p>
          </article>
          }
        </div>
      </div>
    </section>
  `
})
export class AchievementsComponent {
  readonly achievements = ACHIEVEMENTS;
  readonly featuredCard = ACHIEVEMENTS[0];
  readonly secondaryCards = ACHIEVEMENTS.slice(1);
  readonly i18n = inject(I18nService);
  private readonly slideIndexes = new Map<string, number>();
  private activeCarouselTitle = '';
  private touchStartX = 0;

  currentSlideIndex(title: string): number {
    return this.slideIndexes.get(title) ?? 0;
  }

  previousSlide(title: string): void {
    this.slideIndexes.set(title, 0);
  }

  nextSlide(title: string): void {
    this.slideIndexes.set(title, 1);
  }

  setActiveCarousel(title: string): void {
    this.activeCarouselTitle = title;
  }

  clearActiveCarousel(): void {
    this.activeCarouselTitle = '';
  }

  @HostListener('document:keydown', ['$event'])
  onCarouselKeydown(event: KeyboardEvent): void {
    if (!this.activeCarouselTitle) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousSlide(this.activeCarouselTitle);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide(this.activeCarouselTitle);
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(event: TouchEvent, title: string): void {
    const touchEndX = event.changedTouches[0]?.clientX ?? this.touchStartX;
    const swipeDistance = touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) < 40) {
      return;
    }

    if (swipeDistance < 0) {
      this.nextSlide(title);
      return;
    }

    this.previousSlide(title);
  }
}
