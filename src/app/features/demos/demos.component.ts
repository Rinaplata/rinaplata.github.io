import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const DEMOS = [
  { key: 'gaze', icon: 'eye', technologies: ['WebGazer.js', 'JavaScript', 'WCAG'] },
  { key: 'gestures', icon: 'hand', technologies: ['MediaPipe', 'JavaScript', 'WCAG'] },
  { key: 'voice', icon: 'mic', technologies: ['Web Speech API', 'JavaScript', 'WCAG'] }
];

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [SectionHeadingComponent, TranslatePipe],
  template: `
    <section class="section" id="demos" aria-labelledby="demos-title">
      <app-section-heading
        [eyebrow]="'demos.eyebrow' | t"
        [title]="'demos.title' | t"
        headingId="demos-title"
        [description]="'demos.description' | t"
      />

      <ul class="cards-grid cards-grid--three">
        @for (demo of demos; track demo.key) {
          <li class="card demo-card">
            <div class="demo-card__top">
              <span class="demo-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  @switch (demo.icon) {
                    @case ('eye') {
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    }
                    @case ('hand') {
                      <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                      <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    }
                    @case ('mic') {
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
                      <path d="M12 18v4" />
                    }
                  }
                </svg>
              </span>
              <span class="demo-card__status">{{ 'demos.status' | t }}</span>
            </div>
            <h3>{{ 'demos.items.' + demo.key + '.title' | t }}</h3>
            <p>{{ 'demos.items.' + demo.key + '.description' | t }}</p>
            <ul class="tags" [attr.aria-label]="'a11y.usedTechnologies' | t">
              @for (tech of demo.technologies; track tech) {
                <li>{{ tech }}</li>
              }
            </ul>
          </li>
        }
      </ul>

      <p class="demos-note">{{ 'demos.note' | t }}</p>
    </section>
  `
})
export class DemosComponent {
  readonly demos = DEMOS;
}
