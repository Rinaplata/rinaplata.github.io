import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `
    <section class="section about" id="sobre-mi" aria-labelledby="about-title">
      <app-section-heading
        eyebrow="Sobre mí"
        title="Tecnología con raíz, propósito e impacto"
        headingId="about-title"
        description="Mi historia une ingeniería, frontend, comunidad e identidad wayuu."
      />

      <div class="about__grid">
        <img
          src="assets/images/optimized/about-700.jpg"
          width="520"
          height="640"
          loading="lazy"
          decoding="async"
          alt="Rina Plata en un espacio profesional y comunitario"
        >
        <div class="about__copy">
          <p>
            Soy Rina Plata, ingeniera de software con experiencia en desarrollo frontend, 
            accesibilidad web y liderazgo comunitario. Entiendo la tecnología como
            una herramienta para abrir oportunidades, contar historias y crear
            productos más humanos.
          </p>
          <p>
            Me apasiona construir interfaces accesibles, claras y útiles. Trabajo
            con Angular, React, TypeScript, accesibilidad y buenas prácticas de UX para que las
            experiencias digitales funcionen bien para más personas. Actualmente, incorporo inteligencia
             artificial en mis proyectos para mejorar la eficiencia y la personalización, 
             siempre con un enfoque ético y centrado en el usuario.
          </p>
          <p>
            También lidero y participo en comunidades donde hablo sobre educación,
            accesibilidad web, liderazgo femenino, identidad indígena e impacto
            social desde la tecnología.
          </p>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}
