import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverduePaymentReportComponent } from './overdue-payment-report.component';

describe('OverduePaymentReportComponent', () => {
  let component: OverduePaymentReportComponent;
  let fixture: ComponentFixture<OverduePaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverduePaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverduePaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
