import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { environment } from '@env/environment';

@Injectable()
export class SeoService {

  constructor(@Inject(DOCUMENT) private rootDoc: Document,
              private location: Location) { }

  createLinkForCanonicalURL() {
    const link: HTMLLinkElement = this.rootDoc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', this.location.normalize(environment.deploymentRootUrl) + this.location.path());
    this.rootDoc.head.appendChild(link);
  }
}
