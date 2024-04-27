import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBComponent } from './template-b.component';

describe('TemplateBComponent', () => {
  let component: TemplateBComponent;
  let fixture: ComponentFixture<TemplateBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
