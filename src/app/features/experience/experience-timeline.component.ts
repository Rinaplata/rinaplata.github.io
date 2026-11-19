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
        @for (item of experience; track item.role + item.company; let i = $index) {
          <article class="timeline__item" [attr.aria-labelledby]="'exp-role-' + i + ' exp-company-' + i">
            <p class="timeline__period">
              {{ item.period | t }}
              <span>{{ item.location | t }}</span>
            </p>
            <h3 [id]="'exp-role-' + i">{{ item.role | t }}</h3>
            <p class="timeline__company" [id]="'exp-company-' + i">{{ item.company }}</p>
            <ul>
              @for (responsibility of item.responsibilities; track responsibility) {
                <li>{{ responsibility | t }}</li>
              }
            </ul>
            <ul class="tags" [attr.aria-label]="'a11y.usedTechnologies' | t">
              @for (tech of item.technologies; track tech) {
                <li>{{ tech | t }}</li>
              }
            </ul>
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
