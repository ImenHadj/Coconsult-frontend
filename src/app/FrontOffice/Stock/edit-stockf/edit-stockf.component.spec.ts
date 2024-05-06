import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockfComponent } from './edit-stockf.component';

describe('EditStockfComponent', () => {
  let component: EditStockfComponent;
  let fixture: ComponentFixture<EditStockfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStockfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStockfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
