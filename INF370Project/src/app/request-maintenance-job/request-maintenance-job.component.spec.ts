import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMaintenanceJobComponent } from './request-maintenance-job.component';

describe('RequestMaintenanceJobComponent', () => {
  let component: RequestMaintenanceJobComponent;
  let fixture: ComponentFixture<RequestMaintenanceJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMaintenanceJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMaintenanceJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
