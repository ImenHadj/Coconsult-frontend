import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularChartCongeComponent } from './circular-chart-conge.component';

describe('CircularChartCongeComponent', () => {
  let component: CircularChartCongeComponent;
  let fixture: ComponentFixture<CircularChartCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularChartCongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularChartCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
