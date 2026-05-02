import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { AchievementsComponent } from '../achievements/achievements.component';
import { CommunitiesComponent } from '../communities/communities.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceTimelineComponent } from '../experience/experience-timeline.component';
import { HeroComponent } from './hero.component';
import { ProjectsGridComponent } from '../projects/projects-grid.component';
import { SkillsComponent } from '../skills/skills.component';
import { TalksGalleryComponent } from '../talks/talks-gallery.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceTimelineComponent,
    TalksGalleryComponent,
    CommunitiesComponent,
    ProjectsGridComponent,
    SkillsComponent,
    AchievementsComponent,
    ContactComponent
  ],
  template: `
    <app-hero />
    <app-about />
    <app-experience-timeline />
    <app-talks-gallery />
    <app-communities />
    <app-projects-grid />
    <app-skills />
    <app-achievements />
    <app-contact />
  `
})
export class HomePageComponent {}
