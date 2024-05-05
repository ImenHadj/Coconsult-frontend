import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCalenderComponent } from './task-calender.component';

describe('TaskCalenderComponent', () => {
  let component: TaskCalenderComponent;
  let fixture: ComponentFixture<TaskCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
