import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherStockComponent } from './afficher-stock.component';

describe('AfficherStockComponent', () => {
  let component: AfficherStockComponent;
  let fixture: ComponentFixture<AfficherStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
