import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPropertyTypeComponent } from './search-property-type.component';

describe('SearchPropertyTypeComponent', () => {
  let component: SearchPropertyTypeComponent;
  let fixture: ComponentFixture<SearchPropertyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPropertyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
