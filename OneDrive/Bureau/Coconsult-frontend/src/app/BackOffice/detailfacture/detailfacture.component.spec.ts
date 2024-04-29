import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfactureComponent } from './detailfacture.component';

describe('DetailfactureComponent', () => {
  let component: DetailfactureComponent;
  let fixture: ComponentFixture<DetailfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
