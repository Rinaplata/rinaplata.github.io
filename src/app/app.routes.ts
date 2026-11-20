import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { AllTalksPageComponent } from './features/talks/all-talks-page.component';
import { CvPageComponent } from './features/cv/cv-page.component';
import { AccessibilityPageComponent } from './features/accessibility/accessibility-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, data: { titleKey: 'pageTitles.home' } },
  { path: 'charlas', component: AllTalksPageComponent, data: { titleKey: 'pageTitles.talks' } },
  { path: 'cv', component: CvPageComponent, data: { titleKey: 'pageTitles.cv' } },
  { path: 'accesibilidad', component: AccessibilityPageComponent, data: { titleKey: 'pageTitles.accessibility' } },
  { path: '**', redirectTo: '' }
];
