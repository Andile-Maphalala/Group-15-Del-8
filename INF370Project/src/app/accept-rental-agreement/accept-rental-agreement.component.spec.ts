import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRentalAgreementComponent } from './accept-rental-agreement.component';

describe('AcceptRentalAgreementComponent', () => {
  let component: AcceptRentalAgreementComponent;
  let fixture: ComponentFixture<AcceptRentalAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptRentalAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
