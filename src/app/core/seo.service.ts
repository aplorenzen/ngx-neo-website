import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SeoService {

  constructor(@Inject(DOCUMENT) private rootDoc: Document) { }

  createLinkForCanonicalURL() {
    const link: HTMLLinkElement = this.rootDoc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', this.rootDoc.URL);
    this.rootDoc.head.appendChild(link);
  }
}
