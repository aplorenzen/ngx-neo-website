import {Component, HostListener, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        display: 'none',
        transform: 'translate3d(120%, 0, 0)'
      })),
      state('out', style({
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  menuState = 'out';
  mobileView = false;

  constructor(private i18nService: I18nService) {}

  handleResize() {
    if (window.innerWidth >= 576) {
      this.menuState = 'out';
      this.mobileView = false;
    } else {
      this.menuState = 'in';
      this.mobileView = true;
    }
  }

  ngOnInit() {
    this.handleResize();
  }

  toggleMenu() {
    if (this.mobileView) {
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleResize();
  }

  hideMenu() {
    if (this.mobileView) {
      this.menuState = 'in';
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
    this.hideMenu();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
