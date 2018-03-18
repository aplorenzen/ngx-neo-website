import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollClass]'
})
export class ScrollClassDirective {

  constructor() {}

  @HostBinding('class.navbar-shrink')
  private applyClass = false;

  @HostListener('window:scroll', ['$event'])
  public windowScrolled($event: Event) {
    this.windowScrollEvent($event);
  }

  protected windowScrollEvent($event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // const isReachingTop = scrollTop < 100;
    // console.log(scrollTop);
    // this.renderer.addClass(this.elementRef.nativeElement, 'navbar-shrink');
    this.applyClass = true;

    if (scrollTop > 100) {
      this.applyClass = true;
      // this.renderer.addClass(this.elementRef.nativeElement, 'navbar-shrink');
    } else {
      this.applyClass = false;
      // this.renderer.removeClass(this.elementRef.nativeElement, 'navbar-shrink');
    }
  }
}
