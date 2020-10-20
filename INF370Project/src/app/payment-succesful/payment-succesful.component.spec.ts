import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccesfulComponent } from './payment-succesful.component';

describe('PaymentSuccesfulComponent', () => {
  let component: PaymentSuccesfulComponent;
  let fixture: ComponentFixture<PaymentSuccesfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSuccesfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
