import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nService } from '../../core/services/i18n.service';

/**
 * Opens links to other sites in a new tab and tells screen reader users
 * about it with visually hidden text.
 */
@Directive({
  selector: 'a[href]',
  standalone: true
})
export class ExternalLinkDirective implements AfterViewInit {
  private readonly element = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  private readonly i18n = inject(I18nService);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const anchor = this.element.nativeElement;
    const href = anchor.getAttribute('href') ?? '';

    if (!/^https?:\/\//i.test(href) || new URL(anchor.href).host === window.location.host) {
      return;
    }

    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';

    const visibleText = [...anchor.childNodes]
      .filter(node => !(node instanceof HTMLElement && (node.classList.contains('sr-only') || node.getAttribute('aria-hidden') === 'true')))
      .map(node => node.textContent ?? '')
      .join('')
      .trim();

    if (visibleText && !anchor.querySelector('.button__arrow')) {
      const icon = document.createElement('span');
      icon.className = 'external-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '↗';
      anchor.appendChild(icon);
    }

    const hint = document.createElement('span');
    hint.className = 'sr-only';
    anchor.appendChild(hint);

    this.i18n.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        hint.textContent = ` (${this.i18n.translate('a11y.newTab')})`;
      });
  }
}
