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
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

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
    ContactComponent,
    TranslatePipe
  ],
  template: `
    <app-hero />
    <section class="plain-summary" aria-labelledby="plain-summary-title">
      <div class="plain-summary__inner">
        <h2 id="plain-summary-title">{{ 'plain.title' | t }}</h2>
        <p>{{ 'plain.description' | t }}</p>
        <ul>
          <li>{{ 'plain.items.0' | t }}</li>
          <li>{{ 'plain.items.1' | t }}</li>
          <li>{{ 'plain.items.2' | t }}</li>
          <li>{{ 'plain.items.3' | t }}</li>
        </ul>
      </div>
    </section>
    @defer (on idle) {
      <app-about />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-experience-timeline />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-talks-gallery />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-communities />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-projects-grid />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-skills />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-achievements />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
    @defer (on idle) {
      <app-contact />
    } @placeholder {
      <div class="section-defer-placeholder" aria-hidden="true"></div>
    }
  `
})
export class HomePageComponent {}
