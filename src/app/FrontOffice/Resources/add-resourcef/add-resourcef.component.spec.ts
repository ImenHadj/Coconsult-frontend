import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourcefComponent } from './add-resourcef.component';

describe('AddResourcefComponent', () => {
  let component: AddResourcefComponent;
  let fixture: ComponentFixture<AddResourcefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResourcefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResourcefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
