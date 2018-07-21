import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySkillsComponent } from './key-skills.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';

describe('KeySkillsComponent', () => {
  let component: KeySkillsComponent;
  let fixture: ComponentFixture<KeySkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [
        KeySkillsComponent
      ],
      providers: [
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
