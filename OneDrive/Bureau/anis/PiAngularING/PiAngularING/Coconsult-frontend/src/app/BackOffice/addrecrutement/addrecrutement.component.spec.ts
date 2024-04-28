import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecrutementComponent } from './addrecrutement.component';

describe('AddrecrutementComponent', () => {
  let component: AddrecrutementComponent;
  let fixture: ComponentFixture<AddrecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
