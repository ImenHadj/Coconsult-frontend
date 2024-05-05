import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongeComponent } from './list-conge.component';

describe('ListCongeComponent', () => {
  let component: ListCongeComponent;
  let fixture: ComponentFixture<ListCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
