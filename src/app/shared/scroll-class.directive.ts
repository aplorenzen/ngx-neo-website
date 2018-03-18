import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {RElement} from '@angular/core/src/render3/renderer';

@Directive({
  selector: '[appScrollClass]'
})
export class ScrollClassDirective {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @Input('appScrollClass') public cssClass: string;
  @Input() public appScrollOffset = 100;

  @HostListener('window:scroll', ['$event'])
  public windowScrolled($event: Event) {
    this.windowScrollEvent($event);
  }

  protected windowScrollEvent($event: Event) {
    const scrollTop = (<Document>$event.target).documentElement.scrollTop
      || (<Document>$event.target).body.scrollTop;

    if (scrollTop > this.appScrollOffset) {
      this.renderer.addClass(this.elementRef.nativeElement, this.cssClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.cssClass);
    }
  }
}
