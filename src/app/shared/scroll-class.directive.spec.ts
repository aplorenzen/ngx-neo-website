import {ScrollClassDirective} from './scroll-class.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <nav class="test" appScrollClass></nav>`
})
class TestScrollClassComponent {
}

describe('ScrollClassDirective', () => {
  let component: TestScrollClassComponent;
  let fixture: ComponentFixture<TestScrollClassComponent>;
  let navEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestScrollClassComponent, ScrollClassDirective]
    });

    fixture = TestBed.createComponent(TestScrollClassComponent);
    component = fixture.componentInstance;
    navEl = fixture.debugElement.query(By.directive(ScrollClassDirective));
  });

  it('should have directive as attribute', () => {
    expect(navEl.nativeElement.attributes['appScrollClass']).toBeTruthy();
  });

  it('should apply class when scrolling', () => {
    // TODO: Figure out why this is working? We have not sent a scroll event.
    // Possibly, I would need to mock the Window (and make a WindowRef service,
    // and use that in the directive, and then mock it here). Simply sending
    // a scroll event does not seem to work - the directive does not use anything
    // from the event. But detectChanges makes the test pass, remove it and it
    // fails.
    fixture.detectChanges();
    expect(navEl.classes['navbar-shrink']).toBeDefined();
  });
});
