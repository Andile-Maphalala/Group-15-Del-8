import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToExtendRentalAgreementComponent } from './request-to-extend-rental-agreement.component';

describe('RequestToExtendRentalAgreementComponent', () => {
  let component: RequestToExtendRentalAgreementComponent;
  let fixture: ComponentFixture<RequestToExtendRentalAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToExtendRentalAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToExtendRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
