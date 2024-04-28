import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterResProjComponent } from './affecter-res-proj.component';

describe('AffecterResProjComponent', () => {
  let component: AffecterResProjComponent;
  let fixture: ComponentFixture<AffecterResProjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterResProjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterResProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
