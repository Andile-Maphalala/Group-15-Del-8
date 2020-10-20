import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturejobfeedbackComponent } from './capturejobfeedback.component';

describe('CapturejobfeedbackComponent', () => {
  let component: CapturejobfeedbackComponent;
  let fixture: ComponentFixture<CapturejobfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturejobfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturejobfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
