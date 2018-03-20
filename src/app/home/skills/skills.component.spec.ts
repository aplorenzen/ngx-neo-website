import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import { BarRatingModule } from 'ngx-bar-rating';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BarRatingModule
      ],
      declarations: [
        SkillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
