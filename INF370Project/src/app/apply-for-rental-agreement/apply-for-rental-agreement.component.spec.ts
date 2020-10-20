import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForRentalAgreementComponent } from './apply-for-rental-agreement.component';

describe('ApplyForRentalAgreementComponent', () => {
  let component: ApplyForRentalAgreementComponent;
  let fixture: ComponentFixture<ApplyForRentalAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyForRentalAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
