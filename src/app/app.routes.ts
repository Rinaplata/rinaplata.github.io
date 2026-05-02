import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { AllTalksPageComponent } from './features/talks/all-talks-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'charlas', component: AllTalksPageComponent },
  { path: '**', redirectTo: '' }
];
