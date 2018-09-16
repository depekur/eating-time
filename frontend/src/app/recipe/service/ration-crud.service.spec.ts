import { TestBed, inject } from '@angular/core/testing';

import { RationCrudService } from './ration-crud.service';

describe('RationCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RationCrudService]
    });
  });

  it('should be created', inject([RationCrudService], (service: RationCrudService) => {
    expect(service).toBeTruthy();
  }));
});
