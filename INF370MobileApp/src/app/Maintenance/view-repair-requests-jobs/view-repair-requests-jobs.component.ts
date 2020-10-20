import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/app/classes/Jobs';
import { MaintenanceService } from 'src/app/Services/maintenance.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseLine} from 'src/app/classes/PurchaseLine';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-repair-requests-jobs',
  templateUrl: './view-repair-requests-jobs.component.html',
  styleUrls: ['./view-repair-requests-jobs.component.scss'],
})
export class ViewRepairRequestsJobsComponent implements OnInit {

  dataSaved = false;  
  jobForm: any;
  jobfeedbackForm: any; 
  alljobs: Observable<Job[]>;  
  loadfiltedjobs: Observable<Job[]>;  
  jobsIdUpdate = null;  
  massage = null;  
  allPurchaselines: Observable<PurchaseLine[]>;
  purchaselineForm:any;
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  searchedKeyword: string;

  constructor(private formbulider: FormBuilder,private manService:MaintenanceService, private _Router : Router) { }

  ngOnInit() {

    if (sessionStorage.getItem('EmployeeID') == null) {
      this._Router.navigate(['']);
    }


    this.jobForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
      JOBTYPEID:['', [Validators.required]],  
      EMPLOYEEID:['', [Validators.required]],  
      JOBSTATUSID: ['', [Validators.required]],  
      ADDRESS:['', [Validators.required]],  
      DATEREQUESTED:['', [Validators.required]],  
      DESCRIPTION:['', [Validators.required]],  
      USERNAME:['',[Validators.required]],
      JOBSTATUS:['', [Validators.required]], 
  
   
    })  
    this.loadAlljobs();  
    

        this.jobfeedbackForm = this.formbulider.group({  
         JOBID:['', [Validators.required]], 
         PURCHASELINEID:['', [Validators.required]], 
       //   JOBTYPEID:['', [Validators.required]],  
      //    EMPLOYEEID:['', [Validators.required]],  
        // JOBSTATUSID: ['', [Validators.required]],   
           //DATEREQUESTED:['', [Validators.required]],  
            DESCRIPTION:['', [Validators.required]], 
        //DATECOMPLETED:['', [Validators.required]], 
         
              }) 
              this.loadAllpurchaselines()

  }



  // openWindowCustomClass() {
  //   this.modalService.open(this.content,{ centered: true });
  // }
  // openWindowCustomClass1() {
  //   this.modalService.open(this.content1,{ centered: true });
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAlljobs() {  
    this.alljobs = this.manService.GetAssignedJobs(Number( window.sessionStorage.getItem("EmployeeID")));  
   
  }  

  // onFormsSubmit() {  debugger;
  //   this.dataSaved = false;  
  //   const jobs = this.purchaselineForm.value;  
  //   this.CreateJobtasks(jobs);  
  //   this.purchaselineForm.reset();  
  // }  

  
   onFormSubmit() {  
     this.dataSaved = false;  
     const jobs = this.jobForm.value;  
     
     this.Createjob(jobs);  
     this.purchaselineForm.reset();  
   }  
   onFormSubmitUpdateJob() {  
    this.dataSaved = false;  
    const Job = this.jobfeedbackForm.value;  
    //this.CreateJobtasks(Job) ;
   // this.UpdateJob(Job);

    this.jobfeedbackForm.reset();  
    
  }  

  CompleteJob(JobID : number){
    this.manService.updateJob(JobID).subscribe(() => {  
      //this.openWindowCustomClass1()

      // this.dataSaved = true;  
      // this.closebutton.nativeElement.click(); 
      // this.massage = 'Record Updated Successfully';  
      this.loadAlljobs();  
      }
    );


  }

  setJobID(ID){

    sessionStorage.setItem('JobID',ID);
//this.openWindowCustomClass();

  }
  

      
  loadjobToEdit(jobID: string) {  
    this.manService.getJobById(jobID).subscribe(jobs=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.jobsIdUpdate = null;  
      this.jobsIdUpdate = jobs.JOBID;  
      this.jobfeedbackForm.controls['JOBID'].setValue(jobs.JOBID); 
     // this.purchaselineForm.controls['RENTALAGREEMENTID'].setValue(jobs.RENTALAGREEMENTID); 
      // this.purchaselineForm.controls['JOBTYPEID'].setValue(jobs.JOBTYPEID); 
      // this.purchaselineForm.controls['EMPLOYEEID'].setValue(jobs.EMPLOYEEID); 
      // this.purchaselineForm.controls['JOBSTATUSID'].setValue(jobs.JOBSTATUSID); 
      // this.purchaselineForm.controls['ADDRESS'].setValue(jobs.ADDRESS); 
      // this.purchaselineForm.controls['DATEREQUESTED'].setValue(jobs.DATEREQUESTED);  
      // this.purchaselineForm.controls['DESCRIPTION'].setValue(jobs.DESCRIPTION);  
      // this.purchaselineForm.controls['DATECOMPLETED'].setValue(jobs.DATECOMPLETED);  
          
    }); 
  }
  loadAllpurchaselines() {  
    this.allPurchaselines = this.manService.getAllPurchaseLine();  
}  
    
     
UpdateJob(jobs: Job){
     
          this.manService.updateJob(jobs).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAlljobs();  
            this.jobsIdUpdate = null;  
            this.jobfeedbackForm.reset(); }
          );
      
        }
      //   CreateJobtasks(jobs: Job) {  
      //     if (this.jobsIdUpdate == null) {  debugger;
      //       this.manService.createJobtasks(jobs).subscribe(  
      //         () => {  
      //           this.dataSaved = true;  
      //          this.massage = 'Record saved Successfully';  
      //        //   this.loadAlljobs();  
      //           this.jobsIdUpdate = null;  
      //           this.purchaselineForm.reset();  
      //         }  
      //       );  
      //     } 
      //  }   

       public Addopen() {
        if(0){
          // Dont open the modal
          this.AddshowModalBox = false;
        } else {
           // Open the modal
           this.AddshowModalBox = true;
        }
    
      }
    
     
      public open() {
        if(0){
          // Dont open the modal
          this.showModalBox = false;
        } else {
           // Open the modal
           this.showModalBox = true;
        }
      }

  
   Createjob(jobs: Job) {  
     if (this.jobsIdUpdate == null) {  
       this.manService.createJob(jobs).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAlljobs();  
           this.jobsIdUpdate = null;  
           this.jobForm.reset();  
         }  
       );  
     } 
  }   

//   CreateJobtasks(jobs: Job) {  
//    {  debugger;
//       this.manService.createJobtasks(jobs).subscribe(  
//         () => {  
//           this.dataSaved = true;  
//          this.massage = 'Record saved Successfully';  
//           this.loadAlljobs();  
//           this.jobsIdUpdate = null;  
//           this.jobfeedbackForm.reset();  
//         }  
//       );  
//     } 
//  }   
  
  deletejob(jobId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.manService.deleteJobById(jobId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAlljobs();  
      this.jobsIdUpdate = null;  
      this.jobForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.jobForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  

//////////////////////////////////////////////////////////////
ViewJobTasks(JobID : number){
window.sessionStorage.setItem("JobID", JobID.toString());
this._Router.navigate(['ViewJobTasks']);
}




}
