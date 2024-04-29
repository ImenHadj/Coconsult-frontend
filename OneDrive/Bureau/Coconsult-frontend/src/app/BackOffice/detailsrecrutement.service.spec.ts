import { TestBed } from '@angular/core/testing';

import { DetailsrecrutementService } from './detailsrecrutement.service';

describe('DetailsrecrutementService', () => {
  let service: DetailsrecrutementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsrecrutementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
