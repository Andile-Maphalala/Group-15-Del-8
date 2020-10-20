import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentReportComponent } from './client-payment-report.component';

describe('ClientPaymentReportComponent', () => {
  let component: ClientPaymentReportComponent;
  let fixture: ComponentFixture<ClientPaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
