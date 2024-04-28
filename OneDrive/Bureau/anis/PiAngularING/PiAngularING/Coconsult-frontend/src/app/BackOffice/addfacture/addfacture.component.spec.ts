import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfactureComponent } from './addfacture.component';

describe('AddfactureComponent', () => {
  let component: AddfactureComponent;
  let fixture: ComponentFixture<AddfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
