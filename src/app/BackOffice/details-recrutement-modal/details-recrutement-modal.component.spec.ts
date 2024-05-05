import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecrutementModalComponent } from './details-recrutement-modal.component';

describe('DetailsRecrutementModalComponent', () => {
  let component: DetailsRecrutementModalComponent;
  let fixture: ComponentFixture<DetailsRecrutementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRecrutementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRecrutementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
