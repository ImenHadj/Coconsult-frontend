import { TestBed } from '@angular/core/testing';

import { ServicerecrutementService } from './servicerecrutement.service';

describe('ServicerecrutementService', () => {
  let service: ServicerecrutementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerecrutementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
