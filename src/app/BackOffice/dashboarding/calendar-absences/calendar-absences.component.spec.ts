import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAbsencesComponent } from './calendar-absences.component';

describe('CalendarAbsencesComponent', () => {
  let component: CalendarAbsencesComponent;
  let fixture: ComponentFixture<CalendarAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
