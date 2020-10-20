import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMaintenaceJobComponent } from './request-maintenace-job.component';

describe('RequestMaintenaceJobComponent', () => {
  let component: RequestMaintenaceJobComponent;
  let fixture: ComponentFixture<RequestMaintenaceJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMaintenaceJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMaintenaceJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
