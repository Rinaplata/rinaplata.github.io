import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type TextSize = 'normal' | 'large' | 'xlarge';
export type Spacing = 'normal' | 'wide';
export type Contrast = 'normal' | 'high';
export type Motion = 'normal' | 'reduced';

export interface ReadingPreferences {
  textSize: TextSize;
  spacing: Spacing;
  contrast: Contrast;
  motion: Motion;
}

const STORAGE_KEY = 'reading-preferences';
const DEFAULTS: ReadingPreferences = { textSize: 'normal', spacing: 'normal', contrast: 'normal', motion: 'normal' };

/**
 * Reading preferences (WCAG 1.4.8 and 2.3.3): text size, text spacing,
 * contrast and motion, applied as classes on <html> and saved per visitor.
 */
@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly document = inject(DOCUMENT);
  readonly preferences = signal<ReadingPreferences>(this.load());

  constructor() {
    this.apply(this.preferences());
  }

  set<K extends keyof ReadingPreferences>(key: K, value: ReadingPreferences[K]): void {
    const next = { ...this.preferences(), [key]: value };
    this.preferences.set(next);
    this.apply(next);
    this.save(next);
  }

  reset(): void {
    this.preferences.set({ ...DEFAULTS });
    this.apply(DEFAULTS);
    this.save(DEFAULTS);
  }

  private apply(preferences: ReadingPreferences): void {
    const root = this.document.documentElement;
    root.classList.toggle('text-large', preferences.textSize === 'large');
    root.classList.toggle('text-xlarge', preferences.textSize === 'xlarge');
    root.classList.toggle('spacing-wide', preferences.spacing === 'wide');
    root.classList.toggle('contrast-high', preferences.contrast === 'high');
    root.classList.toggle('motion-reduced', preferences.motion === 'reduced');
  }

  private load(): ReadingPreferences {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      return { ...DEFAULTS, ...stored };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private save(preferences: ReadingPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage can be unavailable (private mode); preferences still apply for this visit.
    }
  }
}
