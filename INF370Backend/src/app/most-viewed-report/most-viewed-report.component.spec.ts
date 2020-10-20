import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedReportComponent } from './most-viewed-report.component';

describe('MostViewedReportComponent', () => {
  let component: MostViewedReportComponent;
  let fixture: ComponentFixture<MostViewedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
