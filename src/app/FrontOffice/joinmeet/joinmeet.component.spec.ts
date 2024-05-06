import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinmeetComponent } from './joinmeet.component';

describe('JoinmeetComponent', () => {
  let component: JoinmeetComponent;
  let fixture: ComponentFixture<JoinmeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinmeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinmeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
