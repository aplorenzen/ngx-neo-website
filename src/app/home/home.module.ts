import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BarRatingModule } from 'ngx-bar-rating';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { BannerComponent } from './banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import {NgsRevealModule} from 'ng-scrollreveal';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    NgxPageScrollModule,
    BarRatingModule,
    NgsRevealModule
  ],
  declarations: [
    HomeComponent,
    BannerComponent,
    ProfileComponent,
    SkillsComponent,
    FooterComponent
  ],
  providers: [
    QuoteService
  ]
})
export class HomeModule { }
