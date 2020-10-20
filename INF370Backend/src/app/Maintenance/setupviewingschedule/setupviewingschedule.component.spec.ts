import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupviewingscheduleComponent } from './setupviewingschedule.component';

describe('SetupviewingscheduleComponent', () => {
  let component: SetupviewingscheduleComponent;
  let fixture: ComponentFixture<SetupviewingscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupviewingscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupviewingscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
