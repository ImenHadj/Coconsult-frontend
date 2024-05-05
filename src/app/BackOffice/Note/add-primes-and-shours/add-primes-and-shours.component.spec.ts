import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrimesAndSHoursComponent } from './add-primes-and-shours.component';

describe('AddPrimesAndSHoursComponent', () => {
  let component: AddPrimesAndSHoursComponent;
  let fixture: ComponentFixture<AddPrimesAndSHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrimesAndSHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrimesAndSHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
