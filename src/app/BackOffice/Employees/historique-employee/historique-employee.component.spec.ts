import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueEmployeeComponent } from './historique-employee.component';

describe('HistoriqueEmployeeComponent', () => {
  let component: HistoriqueEmployeeComponent;
  let fixture: ComponentFixture<HistoriqueEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
