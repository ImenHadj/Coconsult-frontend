import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRecrutementComponent } from './modifier-recrutement.component';

describe('ModifierRecrutementComponent', () => {
  let component: ModifierRecrutementComponent;
  let fixture: ComponentFixture<ModifierRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierRecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
