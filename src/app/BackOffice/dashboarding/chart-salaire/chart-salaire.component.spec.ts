import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSalaireComponent } from './chart-salaire.component';

describe('ChartSalaireComponent', () => {
  let component: ChartSalaireComponent;
  let fixture: ComponentFixture<ChartSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSalaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
