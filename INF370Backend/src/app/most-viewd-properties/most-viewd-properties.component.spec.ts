import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewdPropertiesComponent } from './most-viewd-properties.component';

describe('MostViewdPropertiesComponent', () => {
  let component: MostViewdPropertiesComponent;
  let fixture: ComponentFixture<MostViewdPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewdPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewdPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
