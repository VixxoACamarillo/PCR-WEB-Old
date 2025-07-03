import { TestBed } from '@angular/core/testing';

import { PcrService } from './pcr.service';

describe('PcrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PcrService = TestBed.get(PcrService);
    expect(service).toBeTruthy();
  });
});
