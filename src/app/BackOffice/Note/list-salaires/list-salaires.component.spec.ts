import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalairesComponent } from './list-salaires.component';

describe('ListSalairesComponent', () => {
  let component: ListSalairesComponent;
  let fixture: ComponentFixture<ListSalairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
