import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourcefComponent } from './edit-resourcef.component';

describe('EditResourcefComponent', () => {
  let component: EditResourcefComponent;
  let fixture: ComponentFixture<EditResourcefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResourcefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResourcefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
