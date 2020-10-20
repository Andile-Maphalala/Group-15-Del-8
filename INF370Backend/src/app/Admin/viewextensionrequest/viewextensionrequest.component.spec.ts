import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewextensionrequestComponent } from './viewextensionrequest.component';

describe('ViewextensionrequestComponent', () => {
  let component: ViewextensionrequestComponent;
  let fixture: ComponentFixture<ViewextensionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewextensionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewextensionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
