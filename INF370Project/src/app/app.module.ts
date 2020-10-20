import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AddUserComponent } from './User/add-user/add-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { AgentComponent } from './agent/agent.component';
import { AddAgentComponent } from './Agent/add-agent/add-agent.component';
import { UpdateAgentComponent } from './Agent/update-agent/update-agent.component';
import { AssignAgentComponent } from './Agent/assign-agent/assign-agent.component';
import { SearchUserComponent } from './User/search-user/search-user.component';
import { SearchAgentComponent } from './Agent/search-agent/search-agent.component';
import { AddComplaintComponent } from './Complaint/add-complaint/add-complaint.component';
// import { AssignComplaintComponent } from './Complaint/assign-complaint/assign-complaint.component';
import { SearchComplaintComponent } from './Complaint/search-complaint/search-complaint.component';
// import { AddFeedbackComponent } from './Complaint/add-feedback/add-feedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { BrowsepropertiesComponent } from './browseproperties/browseproperties.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MakePropertyViewingBookingComponent } from './make-property-viewing-booking/make-property-viewing-booking.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { AcceptRentalAgreementComponent } from './accept-rental-agreement/accept-rental-agreement.component';
import { ApprovedApplicationComponent } from './approved-application/approved-application.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AccountComponent } from './account/account.component';
import { ApplyForRentalAgreementComponent } from './apply-for-rental-agreement/apply-for-rental-agreement.component';
import { RequestMaintenanceJobComponent } from './request-maintenance-job/request-maintenance-job.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { SuccessComponent } from './success/success.component';
import { FailComponent } from './fail/fail.component';

import { RequestToExtendRentalAgreementComponent } from './request-to-extend-rental-agreement/request-to-extend-rental-agreement.component';
import { RequestToTerminateRentalAgreementComponent } from './request-to-terminate-rental-agreement/request-to-terminate-rental-agreement.component';
import { ViewUserComponent } from './User/view-user/view-user.component';
import { UsernameComponent } from './username/username.component';
import { IsLoggedInComponent } from './is-logged-in/is-logged-in.component';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { UpdateComplaintComponent } from './Complaint/update-complaint/update-complaint.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotifyComponent } from './notify/notify.component';
import { PaymentSuccesfulComponent } from './payment-succesful/payment-succesful.component';
import { PaymentCancelledComponent } from './payment-cancelled/payment-cancelled.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { LoaderService } from './services/loader.service';
import { ErrorHandlerService } from './interceptors/error-handler.service';
import { GlobalErrorHandler } from './Services/loader';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VerifyComponent } from './verify/verify.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { ViewrequestedjobsComponent } from './viewrequestedjobs/viewrequestedjobs.component';
import { MonthlyinvoiceReportComponent } from './monthlyinvoice-report/monthlyinvoice-report.component';
import { ViewapplicationsComponent } from './viewapplications/viewapplications.component';
import { VideoComponent } from './video/video.component'; 

// import { ErrorsHandler } from './Services/loader';

@NgModule({ 
  declarations: [
    AppComponent,
    AddUserComponent,
    UpdateUserComponent,
    AgentComponent,
    AddAgentComponent,
    UpdateAgentComponent,
    AssignAgentComponent,
    SearchUserComponent,
    SearchAgentComponent,
    AddComplaintComponent,
    SearchComplaintComponent,
    UpdateComplaintComponent,
    LocationComponent,
    EmployeeTypeComponent,
    BrowsepropertiesComponent,
    MakePropertyViewingBookingComponent,
    ViewPropertyComponent,
    MakePaymentComponent,
    ApprovedApplicationComponent,
    AcceptRentalAgreementComponent,
    LoginComponent,
    NavComponent,
    AccountComponent,
    ApplyForRentalAgreementComponent,
    RequestMaintenanceJobComponent,
    ViewPropertyComponent,
   
    PaymentSuccesfulComponent,
    PaymentCancelledComponent,
    ApprovedApplicationComponent,
    ViewFeedbackComponent,
    ViewBookingComponent,
    SuccessComponent,
    FailComponent,
    ViewBookingComponent,
    RequestToExtendRentalAgreementComponent,
    RequestToTerminateRentalAgreementComponent,
    ViewUserComponent,
    UsernameComponent,
    IsLoggedInComponent,
    UpdateBookingComponent,
    UpdateComplaintComponent,
    ResetPasswordComponent,
    NotifyComponent,
    MyLoaderComponent,
    ErrorPageComponent  ,VerifyComponent,ViewPaymentsComponent  ,
    ViewrequestedjobsComponent,
    ViewapplicationsComponent,
    MonthlyinvoiceReportComponent,
    VideoComponent
    
  ],
  imports: [ 
    MbscModule,  
    BrowserModule,
    AppRoutingModule,
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
    MatTreeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    CommonModule,
    NgbModule,
    NgImageSliderModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule

    
  ],
  providers: [ LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },   
     {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }