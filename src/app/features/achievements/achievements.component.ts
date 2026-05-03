import { Component, HostListener } from '@angular/core';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section achievements-section" id="logros" aria-labelledby="achievements-title">
      <app-section-heading
        eyebrow="Logros"
        title="Reconocimientos y participaciones"
        headingId="achievements-title"
        description="Hitos que reflejan aprendizaje, representación y contribución."
      />

      <div class="achievements-layout">
        <article class="card achievement-card achievement-card--carousel achievement-card--featured">
          <div
            class="achievement-carousel"
            role="group"
            [attr.aria-label]="'Reconocimiento: ' + featuredCard.title"
            (focusin)="setActiveCarousel(featuredCard.title)"
            (focusout)="clearActiveCarousel()"
            (touchstart)="onTouchStart($event)"
            (touchend)="onTouchEnd($event, featuredCard.title)"
          >
            <div
              class="achievement-carousel__track"
              [style.transform]="'translateX(-' + (currentSlideIndex(featuredCard.title) * 100) + '%)'"
            >
              <div class="achievement-carousel__slide" role="group" aria-label="Slide 1 de 2">
                <span class="achievement-featured__badge">Reconocimiento destacado</span>
                <p class="meta">{{ featuredCard.year }}</p>
                <h3>{{ featuredCard.title }}</h3>
                <p>{{ featuredCard.description }}</p>
                @if (featuredCard.url) {
                  <div class="card-actions">
                    <a
                      [href]="featuredCard.url"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {{ featuredCard.urlLabel || 'Ver reconocimiento' }}<span class="sr-only">: {{ featuredCard.title }} en una nueva pestaña</span>
                    </a>
                  </div>
                }
              </div>
              <div class="achievement-carousel__slide achievement-carousel__slide--image" role="group" aria-label="Slide 2 de 2">
                <img
                  [src]="featuredCard.images![0].src"
                  width="640"
                  height="520"
                  loading="lazy"
                  [alt]="featuredCard.images![0].alt"
                >
              </div>
            </div>

            <div class="achievement-carousel__controls">
              <button
                class="achievement-carousel__arrow achievement-carousel__arrow--prev"
                type="button"
                (click)="previousSlide(featuredCard.title)"
                [disabled]="currentSlideIndex(featuredCard.title) === 0"
                aria-label="Ver texto del reconocimiento"
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
                aria-label="Ver fotografía del reconocimiento"
              >
                ›
              </button>
            </div>
          </div>
        </article>

        <div class="achievement-secondary-list" role="list" aria-label="Otros logros">
          @for (achievement of secondaryCards; track achievement.title) {
          <article
            class="card achievement-card achievement-card--secondary"
            role="listitem"
          >
            <p class="meta">{{ achievement.year }}</p>
            <h3>{{ achievement.title }}</h3>
            <p>{{ achievement.description }}</p>
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
