import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import {enableProdMode} from '@angular/core';    
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NavController } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import {SetupViewingScheduleComponent} from './Maintenance/setup-viewing-schedule/setup-viewing-schedule.component'
import {CaptureJobFeedbackComponent} from './Maintenance/capture-job-feedback/capture-job-feedback.component'
import {ViewRepairRequestsJobsComponent} from './Maintenance/view-repair-requests-jobs/view-repair-requests-jobs.component';
import { ViewJobTasksComponent } from './Maintenance/view-job-tasks/view-job-tasks.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ViewCompletedJobsComponent } from './Maintenance/view-completed-jobs/view-completed-jobs.component';
import { MyLoaderComponent } from 'src/app/components/my-loader/my-loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { HomeComponent } from './home/home.component';
////////////////////////////////////////////////////////////////
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { UsernameComponent } from './username/username.component';
import { ResetComponent } from './reset/reset.component';
import { MoveInComponent } from './Inspection/move-in/move-in.component';
import { MoveOutComponent } from './Inspection/move-out/move-out.component';
//import { AddItemsPipe } from './Maintenance/add-items.pipe'



@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    SetupViewingScheduleComponent,
    CaptureJobFeedbackComponent,
  ViewRepairRequestsJobsComponent,
  ViewJobTasksComponent,
  ViewCompletedJobsComponent,
  MyLoaderComponent,
  HomeComponent,
  UsernameComponent,
  ResetComponent,
  MoveInComponent,
  MoveOutComponent
 

   //AddItemsPipe
  ],
  entryComponents: [],
  imports: [ 
    MbscModule, BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule, 
     BrowserAnimationsModule,
     ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
     RouterModule,
     Ng2SearchPipeModule,NgbModule,
     NgBootstrapFormValidationModule.forRoot(),
     BrowserAnimationsModule,
     MatAutocompleteModule,
     MatBadgeModule,
     MatBottomSheetModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatCardModule,
     MatCheckboxModule,
     MatChipsModule,
     MatStepperModule,
     MatDatepickerModule,
     MatDialogModule,
     MatDividerModule,
     MatExpansionModule,
     MatGridListModule,
     MatIconModule,
     MatInputModule,
     MatListModule,
     MatMenuModule,
     MatNativeDateModule,
     MatPaginatorModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,
     MatSelectModule,
     MatSidenavModule,
     MatSliderModule,
     MatSlideToggleModule,
     MatSnackBarModule,
     MatSortModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatTreeModule
     


],
  providers: [ LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, 
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
