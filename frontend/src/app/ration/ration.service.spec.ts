import { TestBed, inject } from '@angular/core/testing';

import { RationService } from './ration.service';

describe('RationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RationService]
    });
  });

  it('should be created', inject([RationService], (service: RationService) => {
    expect(service).toBeTruthy();
  }));
});
