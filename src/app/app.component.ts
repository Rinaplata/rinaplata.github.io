import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './core/layout/footer.component';
import { HeaderComponent } from './core/layout/header.component';
import { FocusService } from './core/services/focus.service';
import { I18nService } from './core/services/i18n.service';
import { PreferencesService } from './core/services/preferences.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  template: `
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly focus = inject(FocusService);
  private readonly i18n = inject(I18nService);
  private readonly preferences = inject(PreferencesService);
  private readonly destroyRef = inject(DestroyRef);
  private firstNavigation = true;
  private titleKey = 'pageTitles.home';

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onNavigationEnd());

    this.i18n.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateTitle());
  }

  private onNavigationEnd(): void {
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    this.titleKey = child?.snapshot.data['titleKey'] ?? 'pageTitles.home';
    this.updateTitle();

    const fragment = this.router.parseUrl(this.router.url).fragment;

    if (fragment) {
      this.focus.focusWhenReady(fragment);
    } else if (!this.firstNavigation) {
      window.setTimeout(() => this.focus.focusPageHeading());
    }

    this.firstNavigation = false;
  }

  private updateTitle(): void {
    document.title = this.i18n.translate(this.titleKey);
  }
}
