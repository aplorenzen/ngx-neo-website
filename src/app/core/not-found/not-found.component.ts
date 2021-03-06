import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/core/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.createLinkForCanonicalURL();
  }

}
