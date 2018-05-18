import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollClass]'
})
export class ScrollClassDirective {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @Input() public cssClass: string;
  @Input() public appScrollOffset = 100;

  @HostListener('window:scroll', ['$event'])
  public windowScrolled($event: Event) {
    this.windowScrollEvent($event);
  }

  public applyDirective(scrollTop: number) {
    if (scrollTop > this.appScrollOffset) {
      this.renderer.addClass(this.elementRef.nativeElement, this.cssClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.cssClass);
    }
  }

  protected windowScrollEvent($event: Event) {
    // Some browsers have a preference for setting the scroll Y offset in
    // different places. We take the document from the event here, and
    // locate any offset value that is defined and non zero.
    const scrollTop = (<Document>$event.target).documentElement.scrollTop
      || (<Document>$event.target).body.scrollTop;

    this.applyDirective(scrollTop);
  }
}
