import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharthrComponent } from './charthr.component';

describe('CharthrComponent', () => {
  let component: CharthrComponent;
  let fixture: ComponentFixture<CharthrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharthrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharthrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
