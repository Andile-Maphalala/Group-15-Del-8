import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedApplicationComponent } from './approved-application.component';

describe('ApprovedApplicationComponent', () => {
  let component: ApprovedApplicationComponent;
  let fixture: ComponentFixture<ApprovedApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
