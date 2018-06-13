import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/core/seo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seoService: SeoService,
              private location: Location) { }

  ngOnInit() {
    this.seoService.createLinkForCanonicalURL();
  }

}
