import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {ChuckComponent} from './chuck.component';
import {QuoteService} from '@app/home/quote.service';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChuckComponent', () => {
  let component: ChuckComponent;
  let fixture: ComponentFixture<ChuckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        CoreModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [
        ChuckComponent
      ],
      providers: [
        QuoteService]
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
