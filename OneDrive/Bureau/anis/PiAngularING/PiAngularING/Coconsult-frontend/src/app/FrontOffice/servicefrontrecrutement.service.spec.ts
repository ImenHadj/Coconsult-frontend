import { TestBed } from '@angular/core/testing';

import { ServicefrontrecrutementService } from './servicefrontrecrutement.service';

describe('ServicefrontrecrutementService', () => {
  let service: ServicefrontrecrutementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefrontrecrutementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
