import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiflogComponent } from './notiflog.component';

describe('NotiflogComponent', () => {
  let component: NotiflogComponent;
  let fixture: ComponentFixture<NotiflogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotiflogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotiflogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
