import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInComponent } from './move-in.component';

describe('MoveInComponent', () => {
  let component: MoveInComponent;
  let fixture: ComponentFixture<MoveInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
