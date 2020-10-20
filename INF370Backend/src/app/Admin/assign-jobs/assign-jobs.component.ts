import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/classes/Jobs';
import { AdminService } from 'src/app/admin.service';
import {Employee} from 'src/classes/Employee';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-assign-jobs',
  templateUrl: './assign-jobs.component.html',
  styleUrls: ['./assign-jobs.component.css']
})
export class AssignJobsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  jobForm: any;  
  employeeForm:any;
  jobfeedbackForm: any;  
  alljobs: Observable<Job[]>; 
  allemployees:Observable<Employee[]>;
  filteredjobs:Observable<Job[]>; 
  jobsIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
 
   
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  searching: boolean;
  
 
  constructor(private httpService: HttpClient,private modalService: NgbModal,private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
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
  
   
    }) ;  this.loadAlljobs(); 
    this.jobfeedbackForm = this.formbulider.group({  
    JOBID:['', [Validators.required]],
    EMPLOYEEID:['', [Validators.required]],  
  

   
        }) 
         this.employeeForm = this.formbulider.group({  
      USERID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID:['', [Validators.required]],  
      DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO:['', [Validators.required]],  
      EMPLOYEETYPEID:['', [Validators.required]],
        }) 
    this.loadAllemployees();  
    this.employeeForm = this.formbulider.group({  
      USERID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID:['', [Validators.required]],  
      DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO:['', [Validators.required]],  
      EMPLOYEETYPEID:['', [Validators.required]],
        }) 
    this.loadAllemployees();  
    
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAlljobs() {  
    this.alljobs = this.adminService.GetAssignedJobs();  
  }  

    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const jobs = this.jobForm.value;  
     this.Createjob(jobs);  
     this.jobForm.reset();  
   }  
   onFormSubmitUpdateJob() {  
        this.dataSaved = false;  
        const Job = this.jobfeedbackForm.value;  
        this.UpdateJob(Job);  
        this.jobfeedbackForm.reset();  
        
      }  
  

      
  loadjobToEdit(jobID: string) {  
    this.adminService.getJobById(jobID).subscribe(jobs=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this. jobsIdUpdate = null;  
      this.jobsIdUpdate = jobs.JOBID;  
      this.jobfeedbackForm.controls['JOBID'].setValue(jobs.JOBID); 
      this.jobfeedbackForm.controls['RENTALAGREEMENTID'].setValue(jobs.RENTALAGREEMENTID); 
      // this.jobfeedbackForm.controls['JOBTYPEID'].setValue(jobs.JOBTYPEID); 
      // this.jobfeedbackForm.controls['EMPLOYEEID'].setValue(jobs.EMPLOYEEID); 
      // this.jobfeedbackForm.controls['JOBSTATUSID'].setValue(jobs.JOBSTATUSID); 
      // this.jobfeedbackForm.controls['DATEREQUESTED'].setValue(jobs.DATEREQUESTED);  
      // this.jobfeedbackForm.controls['DESCRIPTION'].setValue(jobs.DESCRIPTION);  
      // this.jobfeedbackForm.controls['DATECOMPLETED'].setValue(jobs.DATECOMPLETED);  
          
    }); 
   
  }
     
  loadAllemployees() {  
    this.allemployees = this.adminService.getAllEmployee();  
  }  

UpdateJob(jobs: Job){
      debugger;
          this.adminService.updateJob(jobs).subscribe(() => {  
            this.loadAlljobs();  
           // this.closebutton.nativeElement.click(); 
            this.dataSaved = true;  
            // this.massage = 'Record Updated Successfully';  
            this.openWindowCustomClass(); 
            this.jobsIdUpdate = null;  
            this.jobfeedbackForm.reset(); }
          );
      
        }
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
  
        openWindowCustomClass() {
          this.modalService.open(this.content,{ centered: true });
        }
  
 
  
   Createjob(jobs: Job) {  
     if (this.jobsIdUpdate == null) {  debugger;
       this.adminService.createJob(jobs).subscribe(  
         () => {  
          this.loadAlljobs();  
          this.closebutton.nativeElement.click(); 
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
         
           this.jobsIdUpdate = null;  
           this.jobfeedbackForm.reset();  
         }  
       );  
     } 
  }   
  
  deletejob(jobId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.adminService.deleteJobById(jobId).subscribe(() => {  
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
     
}
