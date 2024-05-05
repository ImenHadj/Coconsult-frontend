import { TestBed } from '@angular/core/testing';

import { MeetjoinService } from './meetjoin.service';

describe('MeetjoinService', () => {
  let service: MeetjoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetjoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
