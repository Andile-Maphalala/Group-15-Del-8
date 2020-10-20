import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignJobsComponent } from './assign-jobs.component';

describe('AssignJobsComponent', () => {
  let component: AssignJobsComponent;
  let fixture: ComponentFixture<AssignJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
