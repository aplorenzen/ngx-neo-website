import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxPageScrollModule } from 'ngx-page-scroll';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { BannerComponent } from '@app/home/banner/banner.component';
import { ProfileComponent } from './profile/profile.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CoreModule,
          SharedModule,
          HttpClientTestingModule,
          NgxPageScrollModule
        ],
        declarations: [
          HomeComponent,
          BannerComponent,
          ProfileComponent
        ],
        providers: [QuoteService]
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
