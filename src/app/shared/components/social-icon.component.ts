import { Component, input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  template: `
    @if (name() === 'sessionize') {
      <img 
        src="assets/images/sessionize-avatar-invert.png" 
        alt=""
        aria-hidden="true"
        [style.width]="'100%'"
        [style.height]="'100%'"
      />
    } @else {
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        @switch (name()) {
          @case ('linkedin') {
            <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
          }
          @case ('github') {
            <path d="M12 .3A11.7 11.7 0 0 0 .3 12.15c0 5.23 3.39 9.67 8.1 11.24.59.1.8-.26.8-.57v-2.17c-3.29.73-3.98-1.43-3.98-1.43-.54-1.4-1.32-1.77-1.32-1.77-1.08-.75.08-.74.08-.74 1.19.08 1.82 1.25 1.82 1.25 1.06 1.84 2.78 1.31 3.46 1 .1-.79.41-1.31.75-1.62-2.63-.3-5.4-1.34-5.4-5.94 0-1.31.46-2.38 1.22-3.22-.12-.31-.53-1.53.12-3.18 0 0 1-.33 3.3 1.23a11.22 11.22 0 0 1 6 0C17.45 4.67 18.45 5 18.45 5c.65 1.65.24 2.87.12 3.18.76.84 1.22 1.91 1.22 3.22 0 4.62-2.77 5.63-5.41 5.93.43.38.81 1.11.81 2.24v3.25c0 .31.21.68.81.57a11.78 11.78 0 0 0 8.09-11.24A11.7 11.7 0 0 0 12 .3Z" />
          }
          @case ('instagram') {
            <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
          }
          @case ('mail') {
            <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.2L4.74 7H4v10h16V7h-.74L12 13.2ZM6.28 7 12 11.9 17.72 7H6.28Z" />
          }
          @case ('download') {
            <path d="M11 3h2v10.59l3.3-3.3 1.4 1.42L12 17.4l-5.7-5.69 1.4-1.42 3.3 3.3V3Zm-6 14h2v2h10v-2h2v4H5v-4Z" />
          }
          @default {
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
          }
        }
      </svg>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1.15em;
      height: 1.15em;
      flex: 0 0 auto;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `
})
export class SocialIconComponent {
  readonly name = input.required<string>();
}
