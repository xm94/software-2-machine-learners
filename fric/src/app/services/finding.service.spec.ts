import { TestBed } from '@angular/core/testing';

import { FindingService } from './finding.service';

describe('FindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindingService = TestBed.get(FindingService);
    expect(service).toBeTruthy();
  });
});
