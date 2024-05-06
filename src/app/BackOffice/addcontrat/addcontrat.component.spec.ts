import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontratComponent } from './addcontrat.component';

describe('AddcontratComponent', () => {
  let component: AddcontratComponent;
  let fixture: ComponentFixture<AddcontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
