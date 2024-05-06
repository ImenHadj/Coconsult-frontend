import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStockfComponent } from './show-stockf.component';

describe('ShowStockfComponent', () => {
  let component: ShowStockfComponent;
  let fixture: ComponentFixture<ShowStockfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStockfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStockfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
