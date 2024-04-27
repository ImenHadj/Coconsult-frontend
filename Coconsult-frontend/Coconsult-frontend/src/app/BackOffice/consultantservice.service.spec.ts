import { TestBed } from '@angular/core/testing';

import { ConsultantserviceService } from './consultantservice.service';

describe('ConsultantserviceService', () => {
  let service: ConsultantserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultantserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
