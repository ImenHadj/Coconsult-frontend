import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFComponent } from './template-f.component';

describe('TemplateFComponent', () => {
  let component: TemplateFComponent;
  let fixture: ComponentFixture<TemplateFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
