import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPostesComponent } from './description-postes.component';

describe('DescriptionPostesComponent', () => {
  let component: DescriptionPostesComponent;
  let fixture: ComponentFixture<DescriptionPostesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionPostesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionPostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
