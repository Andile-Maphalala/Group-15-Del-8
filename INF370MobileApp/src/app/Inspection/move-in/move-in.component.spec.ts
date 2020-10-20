import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveInComponent } from './move-in.component';

describe('MoveInComponent', () => {
  let component: MoveInComponent;
  let fixture: ComponentFixture<MoveInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveInComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
