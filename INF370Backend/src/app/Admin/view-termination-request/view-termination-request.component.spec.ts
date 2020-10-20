import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTerminationRequestComponent } from './view-termination-request.component';

describe('ViewTerminationRequestComponent', () => {
  let component: ViewTerminationRequestComponent;
  let fixture: ComponentFixture<ViewTerminationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTerminationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTerminationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
