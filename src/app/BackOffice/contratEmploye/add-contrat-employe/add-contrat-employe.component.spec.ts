import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContratEmployeComponent } from './add-contrat-employe.component';

describe('AddContratEmployeComponent', () => {
  let component: AddContratEmployeComponent;
  let fixture: ComponentFixture<AddContratEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContratEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContratEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
