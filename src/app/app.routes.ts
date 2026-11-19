import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { AllTalksPageComponent } from './features/talks/all-talks-page.component';
import { CvPageComponent } from './features/cv/cv-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'charlas', component: AllTalksPageComponent },
  { path: 'cv', component: CvPageComponent },
  { path: '**', redirectTo: '' }
];
