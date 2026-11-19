import { Component, signal } from '@angular/core';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { ExternalLinkDirective } from '../../shared/directives/external-link.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [SectionHeadingComponent, ExternalLinkDirective, TranslatePipe],
  template: `
    <section class="section milestones-section" id="logros" aria-labelledby="achievements-title">
      <app-section-heading
        [eyebrow]="'achievements.eyebrow' | t"
        [title]="'achievements.title' | t"
        headingId="achievements-title"
        [description]="'achievements.description' | t"
      />

      <ol class="milestones">
        @for (achievement of achievements; track achievement.title; let i = $index; let first = $first) {
          <li class="milestone" [class.milestone--featured]="first" [class.is-open]="isOpen(i)">
            <h3 class="milestone__heading">
              <button
                type="button"
                class="milestone__toggle"
                [id]="'milestone-toggle-' + i"
                [attr.aria-expanded]="isOpen(i)"
                [attr.aria-controls]="'milestone-content-' + i"
                (click)="toggle(i)"
              >
                <span class="milestone__dot" aria-hidden="true"></span>
                <span class="milestone__year">{{ achievement.year | t }}</span>
                <span class="milestone__title">
                  {{ achievement.title | t }}
                  @if (first) {
                    <span class="achievement-featured__badge">{{ 'achievements.featuredBadge' | t }}</span>
                  }
                </span>
                <span class="milestone__chevron" aria-hidden="true"></span>
              </button>
            </h3>

            <div class="milestone__content" [id]="'milestone-content-' + i" [hidden]="!isOpen(i)">
              @if (isOpen(i)) {
                <div class="milestone__text">
                  <p>{{ achievement.description | t }}</p>
                  @if (achievement.url) {
                    <a class="button" [href]="achievement.url">
                      {{ (achievement.urlLabel || 'achievements.viewRecognition') | t }}<span class="sr-only">: {{ achievement.title | t }}</span>
                      <span class="button__arrow" aria-hidden="true">↗</span>
                    </a>
                  }
                </div>
                @if (achievement.images?.length) {
                  <img
                    class="milestone__image"
                    [src]="achievement.images![0].src"
                    width="733"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    [alt]="achievement.images![0].alt | t"
                  >
                }
              }
            </div>
          </li>
        }
      </ol>
    </section>
  `
})
export class AchievementsComponent {
  readonly achievements = ACHIEVEMENTS;
  private readonly openItems = signal(new Set<number>([0]));

  isOpen(index: number): boolean {
    return this.openItems().has(index);
  }

  toggle(index: number): void {
    const next = new Set(this.openItems());

    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }

    this.openItems.set(next);
  }
}
