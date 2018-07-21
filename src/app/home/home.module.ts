import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgsRevealModule } from 'ng-scrollreveal';
import { CollapsibleModule } from 'angular2-collapsible';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { ChuckComponent } from '@app/home/chuck/chuck.component';
import { QuoteService } from './quote.service';
import { BannerComponent } from '@app/home/banner/banner.component';
import { ProfileComponent } from '@app/home/profile/profile.component';
import { FooterComponent } from '@app/home/footer/footer.component';
import { KeySkillsComponent } from '@app/home/key-skills/key-skills.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HomeComponent } from './home.component';
import { SeoService } from '@app/core/seo.service';
import { AllSkillsComponent } from './all-skills/all-skills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    NgsRevealModule,
    ScrollToModule,
    BrowserAnimationsModule,
    CollapsibleModule
  ],
  declarations: [
    ChuckComponent,
    BannerComponent,
    ProfileComponent,
    KeySkillsComponent,
    FooterComponent,
    HomeComponent,
    AllSkillsComponent
  ],
  providers: [
    QuoteService,
    SeoService
  ]
})
export class HomeModule { }
