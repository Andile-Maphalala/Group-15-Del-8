import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomeReportComponent } from './monthly-income-report.component';
import { Directive,HostListener,HostBinding } from '@angular/core';

describe('MonthlyIncomeReportComponent', () => {
  let component: MonthlyIncomeReportComponent;
  let fixture: ComponentFixture<MonthlyIncomeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyIncomeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  
});
