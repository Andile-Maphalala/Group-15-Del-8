import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInspectionComponent } from './complete-inspection.component';

describe('CompleteInspectionComponent', () => {
  let component: CompleteInspectionComponent;
  let fixture: ComponentFixture<CompleteInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
