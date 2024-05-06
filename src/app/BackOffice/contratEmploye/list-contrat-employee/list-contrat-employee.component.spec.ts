import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratEmployeeComponent } from './list-contrat-employee.component';

describe('ListContratEmployeeComponent', () => {
  let component: ListContratEmployeeComponent;
  let fixture: ComponentFixture<ListContratEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContratEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContratEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
