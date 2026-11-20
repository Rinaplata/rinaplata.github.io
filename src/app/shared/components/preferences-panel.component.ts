import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService, ReadingPreferences } from '../../core/services/preferences.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslatePipe } from '../pipes/translate.pipe';

interface PreferenceGroup {
  key: keyof ReadingPreferences;
  options: string[];
}

const GROUPS: PreferenceGroup[] = [
  { key: 'textSize', options: ['normal', 'large', 'xlarge'] },
  { key: 'spacing', options: ['normal', 'wide'] },
  { key: 'contrast', options: ['normal', 'high'] },
  { key: 'motion', options: ['normal', 'reduced'] }
];

@Component({
  selector: 'app-preferences-panel',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="preferences" (focusout)="onFocusOut($event)">
      <button
        #toggle
        type="button"
        class="preferences__toggle"
        [attr.aria-expanded]="open()"
        aria-controls="preferences-panel"
        (click)="open.set(!open())"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
          <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="17" r="2" />
        </svg>
        <span>{{ 'preferences.title' | t }}</span>
      </button>

      <div
        class="preferences__panel"
        id="preferences-panel"
        role="group"
        [attr.aria-label]="'preferences.title' | t"
        [hidden]="!open()"
      >
        <fieldset class="preferences__group">
          <legend>{{ 'preferences.theme.label' | t }}</legend>
          <div class="preferences__options">
            <label class="preferences__option">
              <input type="radio" name="pref-theme" [checked]="!theme.isDark()" (change)="setDark(false)">
              <span>{{ 'preferences.theme.light' | t }}</span>
            </label>
            <label class="preferences__option">
              <input type="radio" name="pref-theme" [checked]="theme.isDark()" (change)="setDark(true)">
              <span>{{ 'preferences.theme.dark' | t }}</span>
            </label>
          </div>
        </fieldset>

        @for (group of groups; track group.key) {
          <fieldset class="preferences__group">
            <legend>{{ 'preferences.' + group.key + '.label' | t }}</legend>
            <div class="preferences__options">
              @for (option of group.options; track option) {
                <label class="preferences__option">
                  <input
                    type="radio"
                    [name]="'pref-' + group.key"
                    [checked]="preferences.preferences()[group.key] === option"
                    (change)="setPreference(group.key, option)"
                  >
                  <span>{{ 'preferences.' + group.key + '.' + option | t }}</span>
                </label>
              }
            </div>
          </fieldset>
        }

        <div class="preferences__footer">
          <button type="button" class="button" (click)="preferences.reset()">{{ 'preferences.reset' | t }}</button>
          <a routerLink="/accesibilidad" (click)="close(false)">{{ 'preferences.moreInfo' | t }}</a>
        </div>
      </div>
    </div>
  `
})
export class PreferencesPanelComponent {
  readonly preferences = inject(PreferencesService);
  readonly theme = inject(ThemeService);
  readonly groups = GROUPS;
  readonly open = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');

  setDark(isDark: boolean): void {
    if (this.theme.isDark() !== isDark) {
      this.theme.toggle();
    }
  }

  setPreference(key: keyof ReadingPreferences, value: string): void {
    this.preferences.set(key, value as never);
  }

  close(returnFocus = true): void {
    this.open.set(false);

    if (returnFocus) {
      this.toggle()?.nativeElement.focus();
    }
  }

  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;

    if (this.open() && next && !this.host.nativeElement.contains(next)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
