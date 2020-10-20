import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsepropertiesComponent } from './browseproperties.component';

describe('BrowsepropertiesComponent', () => {
  let component: BrowsepropertiesComponent;
  let fixture: ComponentFixture<BrowsepropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsepropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsepropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
