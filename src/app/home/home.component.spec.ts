import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { BannerComponent } from '@app/home/banner/banner.component';
import { ProfileComponent } from '@app/home/profile/profile.component';
import { SkillsComponent } from '@app/home/skills/skills.component';
import { FooterComponent } from '@app/home/footer/footer.component';
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { HomeComponent } from './home.component';
import { ChuckComponent } from '@app/home/chuck/chuck.component';
import { QuoteService } from '@app/home/quote.service';
import { SeoService } from '@app/core/seo.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        ScrollToModule
      ],
      declarations: [
        HomeComponent,
        BannerComponent,
        ProfileComponent,
        SkillsComponent,
        ChuckComponent,
        FooterComponent
      ],
      providers: [
        ScrollToService,
        QuoteService,
        SeoService,
        Location,
        LocationStrategy,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/my/app'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
