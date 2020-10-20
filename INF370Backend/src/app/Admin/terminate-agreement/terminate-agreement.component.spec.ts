import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateAgreementComponent } from './terminate-agreement.component';

describe('TerminateAgreementComponent', () => {
  let component: TerminateAgreementComponent;
  let fixture: ComponentFixture<TerminateAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminateAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminateAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
