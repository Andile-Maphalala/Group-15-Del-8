import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyinvoiceReportComponent } from './monthlyinvoice-report.component';

describe('MonthlyinvoiceReportComponent', () => {
  let component: MonthlyinvoiceReportComponent;
  let fixture: ComponentFixture<MonthlyinvoiceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyinvoiceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyinvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
