import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontratComponent } from './editcontrat.component';

describe('EditcontratComponent', () => {
  let component: EditcontratComponent;
  let fixture: ComponentFixture<EditcontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
