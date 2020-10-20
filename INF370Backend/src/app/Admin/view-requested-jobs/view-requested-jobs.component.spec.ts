import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestedJobsComponent } from './view-requested-jobs.component';

describe('ViewRequestedJobsComponent', () => {
  let component: ViewRequestedJobsComponent;
  let fixture: ComponentFixture<ViewRequestedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRequestedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
