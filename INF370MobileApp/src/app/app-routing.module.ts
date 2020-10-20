import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CaptureJobFeedbackComponent } from './Maintenance/capture-job-feedback/capture-job-feedback.component';
import { SetupViewingScheduleComponent } from './Maintenance/setup-viewing-schedule/setup-viewing-schedule.component';
import { ViewRepairRequestsJobsComponent } from './Maintenance/view-repair-requests-jobs/view-repair-requests-jobs.component';
import { ViewJobTasksComponent } from './Maintenance/view-job-tasks/view-job-tasks.component';
import { ViewCompletedJobsComponent } from './Maintenance/view-completed-jobs/view-completed-jobs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { MoveInComponent } from './Inspection/move-in/move-in.component';
import { MoveOutComponent } from './Inspection/move-out/move-out.component';


const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },

  // {
  //   path: 'Login',
  //   loadChildren: () => import('./login/login.component').then( m => m.LoginComponent)
  // },
  // {
  //   path: 'CaptureJobFeedback',
  //   loadChildren: () => import('./Maintenance/capture-job-feedback/capture-job-feedback.component').then( m => m.CaptureJobFeedbackComponent)
  // },
  // {
  //   path: 'SetUpViewingSchedule',
  //   loadChildren: () => import('./Maintenance/setup-viewing-schedule/setup-viewing-schedule.component').then( m => m.SetupViewingScheduleComponent)
  // },
  // {
  //   path: 'ViewRepairRequsts',
  //   loadChildren: () => import('./Maintenance/view-repair-requests-jobs/view-repair-requests-jobs.component').then( m => m.ViewRepairRequestsJobsComponent)
  // },
  // {
  //   path: 'AddItems',
  //   loadChildren: () => import('./Maintenance/add-items/add-items.component').then( m => m.AddItemsComponent)
  // },
  { path: 'ViewRepairRequsts', component: ViewRepairRequestsJobsComponent },
  { path: 'SetUpViewingSchedule', component: SetupViewingScheduleComponent },
  { path: 'CaptureJobFeedback', component: CaptureJobFeedbackComponent },
  { path: 'ViewJobTasks', component: ViewJobTasksComponent },
  { path: 'ViewCompletedJobs', component: ViewCompletedJobsComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Reset', component: ResetComponent },
  { path: 'MoveIn', component: MoveInComponent },
  { path: 'MoveOut', component: MoveOutComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
