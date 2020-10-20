import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseReminderComponent } from './lease-reminder.component';

describe('LeaseReminderComponent', () => {
  let component: LeaseReminderComponent;
  let fixture: ComponentFixture<LeaseReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
