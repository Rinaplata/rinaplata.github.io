import { Component, inject } from '@angular/core';
import { EXPERIENCE } from '../../data/experience.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section" id="experiencia" aria-labelledby="experience-title">
      <app-section-heading
        [eyebrow]="'experience.eyebrow' | t"
        [title]="'experience.title' | t"
        headingId="experience-title"
        [description]="'experience.description' | t"
      />

      <div class="timeline">
        @for (item of experience; track item.role + item.company) {
          <article class="timeline__item card">
            <div>
              <p class="meta">{{ item.period | t }} · {{ item.location | t }}</p>
              <h3>{{ item.role | t }}</h3>
              <strong>{{ item.company }}</strong>
            </div>
            <ul>
              @for (responsibility of item.responsibilities; track responsibility) {
                <li>{{ responsibility | t }}</li>
              }
            </ul>
            <div class="tags" role="list" [attr.aria-label]="'a11y.usedTechnologies' | t">
              @for (tech of item.technologies; track tech) {
                <span role="listitem">{{ tech | t }}</span>
              }
            </div>
            <div class="achievement-list">
              @for (achievement of item.achievements; track achievement) {
                <p>{{ achievement | t }}</p>
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
  readonly i18n = inject(I18nService);
}
