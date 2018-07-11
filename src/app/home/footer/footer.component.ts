import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {environment} from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  buildId = environment.buildId;
  gitUrl = environment.gitUrl;
  buildUrl = environment.buildUrl;
  dockerImageName = environment.dockerImageName;

  ngOnInit() {
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
