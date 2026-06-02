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
        <img
          src="assets/images/optimized/about-700.jpg"
          width="520"
          height="640"
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        >
        <div class="about__copy">
          <p>
            {{ 'about.paragraphs.0' | t }}
          </p>
          <p>
            {{ 'about.paragraphs.1' | t }}
          </p>
          <p>
            {{ 'about.paragraphs.2' | t }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  readonly i18n = inject(I18nService);
}
