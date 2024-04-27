import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaimentComponent } from './addpaiment.component';

describe('AddpaimentComponent', () => {
  let component: AddpaimentComponent;
  let fixture: ComponentFixture<AddpaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpaimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
