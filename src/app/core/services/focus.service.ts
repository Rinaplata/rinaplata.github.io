import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Moves keyboard and screen reader focus along with in-page navigation,
 * so activating a link puts users where the content now is.
 */
@Injectable({ providedIn: 'root' })
export class FocusService {
  private readonly router = inject(Router);

  /** Scrolls to a home page section and focuses it, keeping a shareable URL (#/#id). */
  goToSection(id: string): void {
    const onHome = this.router.url.split('#')[0] === '/';

    if (!onHome) {
      this.router.navigate(['/'], { fragment: id });
      return;
    }

    history.replaceState(history.state, '', `#/#${id}`);
    this.focusWhenReady(id);
  }

  /** Focuses an element by id once it exists (sections load lazily). */
  focusWhenReady(id: string, attempts = 0): void {
    const target = document.getElementById(id);

    if (target) {
      this.focus(target);
      return;
    }

    if (attempts < 60) {
      window.setTimeout(() => this.focusWhenReady(id, attempts + 1), 50);
    }
  }

  /** Focuses the main heading of the current page. */
  focusPageHeading(): void {
    const heading = document.querySelector<HTMLElement>('main h1');

    if (heading) {
      this.focus(heading);
    }
  }

  focus(element: HTMLElement): void {
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    element.focus({ preventScroll: true });
  }
}
