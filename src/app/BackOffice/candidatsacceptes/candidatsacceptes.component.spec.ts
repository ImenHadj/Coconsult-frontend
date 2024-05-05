import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsacceptesComponent } from './candidatsacceptes.component';

describe('CandidatsacceptesComponent', () => {
  let component: CandidatsacceptesComponent;
  let fixture: ComponentFixture<CandidatsacceptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatsacceptesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsacceptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
