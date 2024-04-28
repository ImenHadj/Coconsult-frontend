import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherFournisseurComponent } from './afficher-fournisseur.component';

describe('AfficherFournisseurComponent', () => {
  let component: AfficherFournisseurComponent;
  let fixture: ComponentFixture<AfficherFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
