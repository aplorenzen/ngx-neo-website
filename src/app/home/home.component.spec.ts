import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
        QuoteService
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
