import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectResourcefComponent } from './affect-resourcef.component';

describe('AffectResourcefComponent', () => {
  let component: AffectResourcefComponent;
  let fixture: ComponentFixture<AffectResourcefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectResourcefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectResourcefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
