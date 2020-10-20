import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrequestedjobsComponent } from './viewrequestedjobs.component';

describe('ViewrequestedjobsComponent', () => {
  let component: ViewrequestedjobsComponent;
  let fixture: ComponentFixture<ViewrequestedjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewrequestedjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrequestedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
