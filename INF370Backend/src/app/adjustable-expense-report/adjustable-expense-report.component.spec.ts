import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustableExpenseReportComponent } from './adjustable-expense-report.component';

describe('AdjustableExpenseReportComponent', () => {
  let component: AdjustableExpenseReportComponent;
  let fixture: ComponentFixture<AdjustableExpenseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustableExpenseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustableExpenseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
