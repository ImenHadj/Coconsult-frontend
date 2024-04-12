import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularChartEmployeeComponent } from './circular-chart-employee.component';

describe('CircularChartEmployeeComponent', () => {
  let component: CircularChartEmployeeComponent;
  let fixture: ComponentFixture<CircularChartEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularChartEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularChartEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
