import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div class="section-heading">
      <span class="section-heading__eyebrow">{{ eyebrow() }}</span>
      <h2 [id]="headingId()">{{ title() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </div>
  `
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly description = input('');
}
