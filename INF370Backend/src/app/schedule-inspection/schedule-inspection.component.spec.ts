import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInspectionComponent } from './schedule-inspection.component';

describe('ScheduleInspectionComponent', () => {
  let component: ScheduleInspectionComponent;
  let fixture: ComponentFixture<ScheduleInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
