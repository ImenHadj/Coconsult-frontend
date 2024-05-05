import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReclamationComponent } from './show-reclamation.component';

describe('ShowReclamationComponent', () => {
  let component: ShowReclamationComponent;
  let fixture: ComponentFixture<ShowReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
