import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrecrutementComponent } from './allrecrutement.component';

describe('AllrecrutementComponent', () => {
  let component: AllrecrutementComponent;
  let fixture: ComponentFixture<AllrecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllrecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllrecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
