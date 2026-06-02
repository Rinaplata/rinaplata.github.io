import { Component, inject } from '@angular/core';
import { SKILLS } from '../../data/skills.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section" id="habilidades" aria-labelledby="skills-title">
      <app-section-heading
        [eyebrow]="'skills.eyebrow' | t"
        [title]="'skills.title' | t"
        headingId="skills-title"
        [description]="'skills.description' | t"
      />

      <div class="cards-grid cards-grid--three">
        @for (group of skillGroups; track group.category) {
          <article class="card skill-card">
            <h3>{{ group.category | t }}</h3>
            <div class="tags tags--large">
              @for (skill of group.skills; track skill) {
                <span [class]="getSkillClass(group.category)">{{ skill | t }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class SkillsComponent {
  readonly skillGroups = SKILLS;
  readonly i18n = inject(I18nService);

  getSkillClass(category: string): string {
    const normalized = category.toLowerCase();

    if (normalized.includes('frontend')) {
      return 'pill--frontend';
    }

    if (normalized.includes('backend') || normalized.includes('api')) {
      return 'pill--backend';
    }

    if (normalized.includes('tools')) {
      return 'pill--design';
    }

    if (normalized.includes('accessibility')) {
      return 'pill--accessibility';
    }

    return 'pill--community';
  }
}
