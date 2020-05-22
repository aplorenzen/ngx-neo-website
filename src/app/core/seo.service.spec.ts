import { TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Location }
      ]
    });
  });

  it('should be created', inject([SeoService], (service: SeoService) => {
    expect(service).toBeTruthy();
  }));
});
