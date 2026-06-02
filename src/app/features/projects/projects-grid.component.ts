import { Component, inject } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section section--deep" id="proyectos" aria-labelledby="projects-title">
      <app-section-heading
        [eyebrow]="'projects.eyebrow' | t"
        [title]="'projects.title' | t"
        headingId="projects-title"
        [description]="'projects.description' | t"
      />

      <div class="projects-grid">
        @for (project of projects; track project.name) {
          <article class="project-card">
            <img
              [src]="project.image"
              width="560"
              height="340"
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
            >
            <div class="project-card__body">
              <h3>{{ project.name | t }}</h3>
              <p>{{ project.description | t }}</p>
              <p class="impact">{{ project.impact | t }}</p>
              <div class="tags" role="list" [attr.aria-label]="'a11y.projectTechnologies' | t">
                @for (tech of project.technologies; track tech) {
                  <span role="listitem">{{ tech | t }}</span>
                }
              </div>
              <div class="card-actions">
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" rel="noreferrer">
                    GitHub<span class="sr-only"> {{ 'a11y.projectGithubNewTab' | t: { name: (project.name | t) } }}</span>
                  </a>
                }
                @if (project.demoUrl) {
                  <a [href]="project.demoUrl" target="_blank" rel="noreferrer">
                    Demo<span class="sr-only"> {{ 'a11y.projectDemoNewTab' | t: { name: (project.name | t) } }}</span>
                  </a>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class ProjectsGridComponent {
  readonly projects = PROJECTS;
  readonly i18n = inject(I18nService);
}
