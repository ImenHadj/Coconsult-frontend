import { TestBed } from '@angular/core/testing';

import { ServicecandidatService } from './servicecandidat.service';

describe('ServicecandidatService', () => {
  let service: ServicecandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
