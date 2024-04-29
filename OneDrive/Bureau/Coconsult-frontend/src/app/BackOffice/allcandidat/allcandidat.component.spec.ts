import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcandidatComponent } from './allcandidat.component';

describe('AllcandidatComponent', () => {
  let component: AllcandidatComponent;
  let fixture: ComponentFixture<AllcandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
