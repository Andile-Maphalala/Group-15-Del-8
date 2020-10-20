import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/app/classes/Jobs';
import { MaintenanceService } from 'src/app/Services/maintenance.service';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseLine} from 'src/app/classes/PurchaseLine';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';
import {JobTask} from 'src/app/classes/JobTask'; 
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import {Supplier} from 'src/app/classes/Supplier';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Item } from 'src/app/item';

//import {Item} from 'src/app/classes/Item';




@Component({
  selector: 'app-view-job-tasks',
  templateUrl: './view-job-tasks.component.html',
  styleUrls: ['./view-job-tasks.component.scss'],
})
export class ViewJobTasksComponent implements OnInit {


  
  jobTask  = new JobTask();
  item  = new Item();
  JobID : number;
  allsuppliers: Observable<Supplier[]>; 

  //allJobTasks : Observable<JobTask[]>; 
    allJobTasks : any;
  @ViewChild('content') content : any;
  @ViewChild('job') job : any;
  @ViewChild('complete') complete : any;
  @ViewChild('comJob') comJob : any;
  @ViewChild('comItem') comItem : any;
  @ViewChild('prompt') prompt : any;
  
  
  searchedKeyword: string;


  constructor(private modalService: NgbModal,public alertController: AlertController,private formbulider: FormBuilder,private manService:MaintenanceService, private _Router : Router) { }

  jobTaskForm = new FormGroup({
    DESCRIPTION : new FormControl(this.jobTask.DESCRIPTION, Validators.required),
  })

  itemForm = new FormGroup({
    NAME : new FormControl(this.item.NAME, [Validators.required,Validators.pattern("[A-Za-z]*")]),
    DESCRIPTION : new FormControl(this.item.DESCRIPTION, Validators.required),
    QUANTITY : new FormControl(this.item.QUANTITY, Validators.required),
    PRICE : new FormControl(this.item.PRICE,[Validators.required,Validators.pattern("[0-9]*")]),
    SUPPLIERID : new FormControl(this.item.SUPPLIERID, Validators.required),
  })

  ngOnInit() {
    if (sessionStorage.getItem('EmployeeID') == null) {
      this._Router.navigate(['']);
    }

    this.JobID = Number(window.sessionStorage.getItem("JobID"))
    this.LoadAllJobtasks();
    this.loadAllsuppliers();


  }

  loadAllsuppliers() {  
    this.allsuppliers = this.manService.getAllSupliers();  
  } 

  openWindowCustomClass(content) {
    
    this.modalService.open(this.content,{ centered: true });
  }


  Test(){
    var element = <HTMLInputElement> document.getElementById("btn");
    element.disabled = true;


  }
  LoadAllJobtasks(){
      this.manService.getJobTasks(this.JobID).subscribe(data => {
      console.log(data);
      this.allJobTasks = data;
    });

  }

  CompleteJobTask()
  {
    
    var JobTaskID = Number(window.sessionStorage.getItem("id"));
    this.manService.CompleteJobTask(JobTaskID).subscribe(data => {
      this.modalService.dismissAll();
      this.modalService.open(this.complete,{ centered: true });

this.LoadAllJobtasks();
    })
  }

  PromptComplete(JobTaskID : number)
  {
    window.sessionStorage.setItem("id",JobTaskID.toString())
    this.modalService.open(this.prompt,{ centered: true });

  }

  AddItem(ID : number){
    window.sessionStorage.setItem("JobTaskID",ID.toString())
    this.modalService.open(this.content,{ centered: true });
  }

  AddJobTask(){
     //window.sessionStorage.setItem("JobTaskID",jontaskID.toString())
     this.modalService.open(this.job,{ centered: true });
  }



  OnSubmitJobTask(){
this.jobTask = this.jobTaskForm.value;
this.jobTask.JOBID = this.JobID;
this.manService.createJobtasks(this.jobTask).subscribe(data => {
  this.jobTaskForm.reset();
  this.modalService.open(this.comJob,{ centered: true });

  this.LoadAllJobtasks();
})
  }

  OnSubmitPurchaseItem(){
this.item = this.itemForm.value;
this.item.JOBTASKID = Number(window.sessionStorage.getItem("JobTaskID"))
this.manService.createPurchaseItems(this.item).subscribe(data => {
  this.itemForm.reset();
  this.modalService.dismissAll({ centered: true })
  this.modalService.open(this.comItem,{ centered: true });

})
  }


















  }


  // async AddJobTaskPopup() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'pop',
  //     header: 'Successful',
  //     message: 'Add a Jobtask',
  //     inputs: [
  //       {
  //         name: 'DESCRIPTION',
  //         placeholder: 'Description'
  //       },
  //     ],
  //     buttons: [ 
  //       {
  //         text: 'Ok',
  //         cssClass: 'secondary',
  //         handler: data => { 
  //           this.AddJobTask(data.DESCRIPTION);
  //     }
  //   }
  //   ]
  //   });

  //   await alert.present();
  // }





  


///////////////////////////////////////////////        





