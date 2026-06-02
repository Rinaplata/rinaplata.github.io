import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div class="section-heading">
      <span class="section-heading__eyebrow">{{ eyebrow() }}</span>
      @if (level() === 'h1') {
        <h1 [id]="headingId()">{{ title() }}</h1>
      } @else {
        <h2 [id]="headingId()">{{ title() }}</h2>
      }
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
  readonly level = input<'h1' | 'h2'>('h2');
}
