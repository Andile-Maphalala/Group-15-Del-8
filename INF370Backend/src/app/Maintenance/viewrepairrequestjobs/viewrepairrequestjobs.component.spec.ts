import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrepairrequestjobsComponent } from './viewrepairrequestjobs.component';

describe('ViewrepairrequestjobsComponent', () => {
  let component: ViewrepairrequestjobsComponent;
  let fixture: ComponentFixture<ViewrepairrequestjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewrepairrequestjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrepairrequestjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
