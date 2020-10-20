import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveOutComponent } from './move-out.component';

describe('MoveOutComponent', () => {
  let component: MoveOutComponent;
  let fixture: ComponentFixture<MoveOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveOutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
