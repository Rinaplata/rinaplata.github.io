import { Component } from '@angular/core';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section section--warm" id="logros" aria-labelledby="achievements-title">
      <app-section-heading
        eyebrow="Logros"
        title="Reconocimientos y participaciones"
        headingId="achievements-title"
        description="Hitos que reflejan aprendizaje, representación y contribución."
      />

      <div class="cards-grid">
        @for (achievement of achievements; track achievement.title) {
          <article class="card achievement-card">
            <p class="meta">{{ achievement.year }}</p>
            <h3>{{ achievement.title }}</h3>
            <p>{{ achievement.description }}</p>
          </article>
        }
      </div>
    </section>
  `
})
export class AchievementsComponent {
  readonly achievements = ACHIEVEMENTS;
}
