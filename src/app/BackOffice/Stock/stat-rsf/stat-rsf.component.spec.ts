import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRSFComponent } from './stat-rsf.component';

describe('StatRSFComponent', () => {
  let component: StatRSFComponent;
  let fixture: ComponentFixture<StatRSFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatRSFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatRSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
