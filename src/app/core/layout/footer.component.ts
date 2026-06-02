import { Component } from '@angular/core';
import { PROFILE } from '../../data/profile.data';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <footer class="footer">
      <p>© {{ currentYear }} {{ profile.name }}. {{ 'footer.builtWith' | t }}</p>
    </footer>
  `
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly currentYear = new Date().getFullYear();
}
