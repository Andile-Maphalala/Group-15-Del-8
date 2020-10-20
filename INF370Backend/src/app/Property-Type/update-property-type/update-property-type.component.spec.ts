import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropertyTypeComponent } from './update-property-type.component';

describe('UpdatePropertyTypeComponent', () => {
  let component: UpdatePropertyTypeComponent;
  let fixture: ComponentFixture<UpdatePropertyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePropertyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
