import { Component } from '@angular/core';
import { EXPERIENCE } from '../../data/experience.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section" id="experiencia" aria-labelledby="experience-title">
      <app-section-heading
        eyebrow="Experiencia"
        title="Frontend, producto y trabajo colaborativo"
        headingId="experience-title"
        description="Experiencia aplicada en interfaces, APIs, accesibilidad y comunidades."
      />

      <div class="timeline">
        @for (item of experience; track item.role + item.company) {
          <article class="timeline__item card">
            <div>
              <p class="meta">{{ item.period }} · {{ item.location }}</p>
              <h3>{{ item.role }}</h3>
              <strong>{{ item.company }}</strong>
            </div>
            <ul>
              @for (responsibility of item.responsibilities; track responsibility) {
                <li>{{ responsibility }}</li>
              }
            </ul>
            <div class="tags" role="list" aria-label="Tecnologías usadas">
              @for (tech of item.technologies; track tech) {
                <span role="listitem">{{ tech }}</span>
              }
            </div>
            <div class="achievement-list">
              @for (achievement of item.achievements; track achievement) {
                <p>{{ achievement }}</p>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class ExperienceTimelineComponent {
  readonly experience = EXPERIENCE;
}
