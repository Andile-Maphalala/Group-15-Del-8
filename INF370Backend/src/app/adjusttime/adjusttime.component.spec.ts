import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjusttimeComponent } from './adjusttime.component';

describe('AdjusttimeComponent', () => {
  let component: AdjusttimeComponent;
  let fixture: ComponentFixture<AdjusttimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjusttimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjusttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
