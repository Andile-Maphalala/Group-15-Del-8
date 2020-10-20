import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRepairRequestsJobsComponent } from './view-repair-requests-jobs.component';

describe('ViewRepairRequestsJobsComponent', () => {
  let component: ViewRepairRequestsJobsComponent;
  let fixture: ComponentFixture<ViewRepairRequestsJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRepairRequestsJobsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRepairRequestsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
