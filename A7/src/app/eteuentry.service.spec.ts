import { TestBed } from '@angular/core/testing';

import { EteuentryService } from './eteuentry.service';

describe('EteuentryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EteuentryService = TestBed.get(EteuentryService);
    expect(service).toBeTruthy();
  });
});
