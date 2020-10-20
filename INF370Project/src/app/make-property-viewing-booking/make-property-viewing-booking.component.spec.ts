import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePropertyViewingBookingComponent } from './make-property-viewing-booking.component';

describe('MakePropertyViewingBookingComponent', () => {
  let component: MakePropertyViewingBookingComponent;
  let fixture: ComponentFixture<MakePropertyViewingBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePropertyViewingBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePropertyViewingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
