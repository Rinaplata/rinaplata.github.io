import { Component, inject } from '@angular/core';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section about" id="sobre-mi" aria-labelledby="about-title">
      <app-section-heading
        [eyebrow]="'about.eyebrow' | t"
        [title]="'about.title' | t"
        headingId="about-title"
        [description]="'about.description' | t"
      />

      <div class="about__grid">
        <figure class="about__photo">
          <img
            src="assets/images/rina/rina-about-720.jpg"
            srcset="assets/images/rina/rina-about-720.jpg 720w, assets/images/rina/rina-about-1080.jpg 1080w"
            sizes="(max-width: 900px) 100vw, 460px"
            width="720"
            height="1080"
            loading="lazy"
            decoding="async"
            [alt]="'about.imageAlt' | t"
          >
          <figcaption>{{ 'about.photoCaption' | t }}</figcaption>
        </figure>
        <div class="about__copy">
          <p class="about__lead">{{ 'about.lead' | t }}</p>
          <p>{{ 'about.paragraphs.0' | t }}</p>
          <p>{{ 'about.paragraphs.1' | t }}</p>
          <p>{{ 'about.paragraphs.2' | t }}</p>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  readonly i18n = inject(I18nService);
}
