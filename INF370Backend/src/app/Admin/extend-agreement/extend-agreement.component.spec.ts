import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendAgreementComponent } from './extend-agreement.component';

describe('ExtendAgreementComponent', () => {
  let component: ExtendAgreementComponent;
  let fixture: ComponentFixture<ExtendAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
