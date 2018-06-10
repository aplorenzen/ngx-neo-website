import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';

import { I18nService } from '../../i18n.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('navigation') navigation: ElementRef;

  constructor(private i18nService: I18nService,
              private elementRef: ElementRef) {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.navigation.nativeElement.classList.contains('show')) {
        // TODO: Need to clean this up and make it typescript
        /* From https://stackoverflow.com/questions/30623825/how-to-use-jquery-with-angular?utm_medium=organic&utm_sourc
        e=google_rich_qa&utm_campaign=google_rich_qa */
        // console.log('clicked outside');
        // const collapseElement: HTMLElement = document.getElementById('collapse-element') as HTMLElement;
        // collapseElement.collapse('hide');
        $('.navbar-collapse').collapse('hide');
      }
    }
  }
}
