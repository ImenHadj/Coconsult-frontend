import { TestBed } from '@angular/core/testing';

import { ProjclientService } from './projclient.service';

describe('ProjclientService', () => {
  let service: ProjclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
