import { Component } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section section--deep" id="proyectos" aria-labelledby="projects-title">
      <app-section-heading
        eyebrow="Proyectos"
        title="Productos digitales con enfoque humano"
        headingId="projects-title"
        description="Frontend, accesibilidad, educación e impacto social."
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
              [alt]="'Captura del proyecto ' + project.name"
            >
            <div class="project-card__body">
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <p class="impact">{{ project.impact }}</p>
              <div class="tags" role="list" aria-label="Tecnologías del proyecto">
                @for (tech of project.technologies; track tech) {
                  <span role="listitem">{{ tech }}</span>
                }
              </div>
              <div class="card-actions">
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" rel="noreferrer">
                    GitHub<span class="sr-only"> del proyecto {{ project.name }} en una nueva pestaña</span>
                  </a>
                }
                @if (project.demoUrl) {
                  <a [href]="project.demoUrl" target="_blank" rel="noreferrer">
                    Demo<span class="sr-only"> del proyecto {{ project.name }} en una nueva pestaña</span>
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
}
