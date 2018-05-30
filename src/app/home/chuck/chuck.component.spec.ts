import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ChuckComponent } from './chuck.component';
import { QuoteService } from '@app/home/quote.service';

describe('ChuckComponent', () => {
  let component: ChuckComponent;
  let fixture: ComponentFixture<ChuckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
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
