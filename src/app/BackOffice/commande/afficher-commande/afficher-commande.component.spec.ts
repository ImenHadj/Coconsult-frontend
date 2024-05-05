import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCommandeComponent } from './afficher-commande.component';

describe('AfficherCommandeComponent', () => {
  let component: AfficherCommandeComponent;
  let fixture: ComponentFixture<AfficherCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
