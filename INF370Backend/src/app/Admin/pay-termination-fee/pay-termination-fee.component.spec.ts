import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTerminationFeeComponent } from './pay-termination-fee.component';

describe('PayTerminationFeeComponent', () => {
  let component: PayTerminationFeeComponent;
  let fixture: ComponentFixture<PayTerminationFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTerminationFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTerminationFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
