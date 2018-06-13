import { Component, OnInit } from '@angular/core';
import { SeoService } from '@app/core/seo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.createLinkForCanonicalURL();
  }

}
