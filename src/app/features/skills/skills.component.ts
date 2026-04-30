import { Component } from '@angular/core';
import { SKILLS } from '../../data/skills.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section" id="habilidades" aria-labelledby="skills-title">
      <app-section-heading
        eyebrow="Habilidades"
        title="Stack técnico y liderazgo"
        headingId="skills-title"
        description="Habilidades organizadas por áreas de trabajo."
      />

      <div class="cards-grid cards-grid--three">
        @for (group of skillGroups; track group.category) {
          <article class="card skill-card">
            <h3>{{ group.category }}</h3>
            <div class="tags tags--large">
              @for (skill of group.skills; track skill) {
                <span>{{ skill }}</span>
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
}
