import { TestBed } from '@angular/core/testing';

import { PostFormDataService } from './post-form-data.service';

describe('PostFormDataService', () => {
  let service: PostFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
