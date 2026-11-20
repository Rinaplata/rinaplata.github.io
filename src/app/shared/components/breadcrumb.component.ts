import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';

/** Shows where the current page sits in the site (WCAG 2.4.8). */
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <nav class="breadcrumb" [attr.aria-label]="'a11y.breadcrumb' | t">
      <ol>
        <li><a routerLink="/">{{ 'header.nav.home' | t }}</a></li>
        <li><span aria-current="page">{{ current() | t }}</span></li>
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  readonly current = input.required<string>();
}
