import { Component } from '@angular/core';
import { AboutComponent } from './features/about/about.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { CommunitiesComponent } from './features/communities/communities.component';
import { ContactComponent } from './features/contact/contact.component';
import { ExperienceTimelineComponent } from './features/experience/experience-timeline.component';
import { HeroComponent } from './features/home/hero.component';
import { ProjectsGridComponent } from './features/projects/projects-grid.component';
import { SkillsComponent } from './features/skills/skills.component';
import { TalksGalleryComponent } from './features/talks/talks-gallery.component';
import { FooterComponent } from './core/layout/footer.component';
import { HeaderComponent } from './core/layout/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ExperienceTimelineComponent,
    TalksGalleryComponent,
    CommunitiesComponent,
    ProjectsGridComponent,
    SkillsComponent,
    AchievementsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-header />
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-experience-timeline />
      <app-talks-gallery />
      <app-communities />
      <app-projects-grid />
      <app-skills />
      <app-achievements />
      <app-contact />
    </main>
    <app-footer />
  `
})
export class AppComponent {}
