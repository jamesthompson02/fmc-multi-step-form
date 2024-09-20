import { TestBed } from '@angular/core/testing';

import { ShowSummaryService } from './show-summary.service';

describe('ShowSummaryService', () => {
  let service: ShowSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
