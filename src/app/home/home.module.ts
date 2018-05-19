import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgsRevealModule } from 'ng-scrollreveal';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { ChuckComponent } from '@app/home/chuck/chuck.component';
import { QuoteService } from './quote.service';
import { BannerComponent } from '@app/home/banner/banner.component';
import { ProfileComponent } from '@app/home/profile/profile.component';
import { FooterComponent } from '@app/home/footer/footer.component';
import { SkillsComponent } from '@app/home/skills/skills.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    NgsRevealModule,
    ScrollToModule
  ],
  declarations: [
    ChuckComponent,
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
