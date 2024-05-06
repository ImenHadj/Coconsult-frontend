import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResourcefComponent } from './show-resourcef.component';

describe('ShowResourcefComponent', () => {
  let component: ShowResourcefComponent;
  let fixture: ComponentFixture<ShowResourcefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowResourcefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowResourcefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
