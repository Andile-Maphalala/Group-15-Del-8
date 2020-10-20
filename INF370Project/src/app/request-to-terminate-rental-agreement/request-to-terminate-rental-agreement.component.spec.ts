import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToTerminateRentalAgreementComponent } from './request-to-terminate-rental-agreement.component';

describe('RequestToTerminateRentalAgreementComponent', () => {
  let component: RequestToTerminateRentalAgreementComponent;
  let fixture: ComponentFixture<RequestToTerminateRentalAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToTerminateRentalAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToTerminateRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
