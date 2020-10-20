import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { LocationComponent } from './location/location.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { BrowsepropertiesComponent } from './browseproperties/browseproperties.component';
import { MakePropertyViewingBookingComponent } from './make-property-viewing-booking/make-property-viewing-booking.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { AcceptRentalAgreementComponent } from './accept-rental-agreement/accept-rental-agreement.component';
import { ApprovedApplicationComponent } from './approved-application/approved-application.component';
import { LoginComponent } from './login/login.component';
import { ApplyForRentalAgreementComponent } from './apply-for-rental-agreement/apply-for-rental-agreement.component';
import { RequestToExtendRentalAgreementComponent } from './request-to-extend-rental-agreement/request-to-extend-rental-agreement.component';
import { RequestToTerminateRentalAgreementComponent } from './request-to-terminate-rental-agreement/request-to-terminate-rental-agreement.component';
import { RequestMaintenanceJobComponent } from './request-maintenance-job/request-maintenance-job.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { ViewUserComponent } from './User/view-user/view-user.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { UpdateComplaintComponent } from './Complaint/update-complaint/update-complaint.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotifyComponent } from './notify/notify.component';
import { PaymentSuccesfulComponent } from './payment-succesful/payment-succesful.component';
import { PaymentCancelledComponent } from './payment-cancelled/payment-cancelled.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VerifyComponent } from './verify/verify.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { ViewrequestedjobsComponent } from './viewrequestedjobs/viewrequestedjobs.component';
import { MonthlyinvoiceReportComponent } from './monthlyinvoice-report/monthlyinvoice-report.component';
import { ViewapplicationsComponent } from './viewapplications/viewapplications.component';  
import { VideoComponent } from './video/video.component';
  



const routes: Routes = [
  {path: '', component: BrowsepropertiesComponent},
  { path: 'register', component: AddUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'search-user', component: SearchUserComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'update-agent', component: UpdateAgentComponent },
  { path: 'add-agent', component: AddAgentComponent },
  { path: 'assign-agent', component: AssignAgentComponent },
  { path: 'search-agent', component: SearchAgentComponent },
  { path: 'add-complaint', component: AddComplaintComponent },
  // { path: 'assign-complaint', component: AssignComplaintComponent },
  { path: 'search-complaint', component: SearchComplaintComponent },
  { path: 'update-complaint', component: UpdateComplaintComponent },
  
  // { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'location', component: LocationComponent },
  { path: 'employeeType', component: EmployeeTypeComponent },
  { path: 'browse', component: BrowsepropertiesComponent },
  { path: 'booking', component: MakePropertyViewingBookingComponent },
  { path: 'PropertyDetails', component: ViewPropertyComponent },
  { path: 'Payment', component: MakePaymentComponent },
  { path: 'AcceptRental', component: AcceptRentalAgreementComponent },
  { path: 'ApprovedApplicationComponent', component: ApprovedApplicationComponent },
  {path: 'login', component: LoginComponent},
  {path: 'apply', component: ApplyForRentalAgreementComponent},
  {path: 'RequestToExtendRentalAgreement', component: RequestToExtendRentalAgreementComponent},
  {path: 'RequestToTerminateRentalAgreement', component: RequestToTerminateRentalAgreementComponent},
  { path: 'AcceptRental', component: AcceptRentalAgreementComponent },
  { path: 'ApprovedApplication', component: ApprovedApplicationComponent },
  { path: 'MakeBooking', component: MakePropertyViewingBookingComponent },
  { path: 'RequestMaintenanceJob', component: RequestMaintenanceJobComponent },
  { path: 'UpdateBooking', component: UpdateBookingComponent },
  { path: 'Reset', component: ResetPasswordComponent },
  { path: 'cancel', component: PaymentCancelledComponent },
  { path: 'success', component: PaymentSuccesfulComponent },
  
  { path: 'notify', component: NotifyComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'Viewrequestedjobs', component: ViewrequestedjobsComponent },
  { path: 'ViewPayments', component: ViewPaymentsComponent },
  { path: 'monthlyinvoice-report', component: MonthlyinvoiceReportComponent },
{ path: 'viewapplications', component: ViewapplicationsComponent },
{ path: 'Video', component: VideoComponent },
  
    
    //{ path: 'MonthlyInvoiceReport', component: MonthlyinvoiceReportComponent },
  //{ path: 'MakePayment', component: MakePaymentComponent },
  //{ path: 'ViewFeedback', component: ViewFeedbackComponent },

  // { path: 'ExpenseReport', component: ExpenseReportComponent },
  // { path: 'MonthlyIncomeReport', component: MonthlyIncomeReportComponent },
  // { path: 'CancelBooking', component: CancelBookingComponent },
  // { path: 'SearchBooking', component: SearchBookingComponent },

  //{ path: 'RequestMaintenaceJob', component: RequestMaintenanceJobComponent },

  { path: 'ViewBooking', component: ViewBookingComponent },
  //{ path: 'OverduePaymentReport', component: OverduePaymentReportComponent },
  { path: 'error', component: ErrorPageComponent },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }