import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ChuckComponent } from './chuck.component';
import { QuoteService } from '@app/home/quote.service';
import { BannerComponent } from '@app/home/banner/banner.component';
import { ProfileComponent } from '@app/home/profile/profile.component';
import { SkillsComponent } from '@app/home/skills/skills.component';
import { FooterComponent } from '@app/home/footer/footer.component';
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

describe('ChuckComponent', () => {
  let component: ChuckComponent;
  let fixture: ComponentFixture<ChuckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CoreModule,
          SharedModule,
          HttpClientTestingModule,
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
          QuoteService,
          ScrollToService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
