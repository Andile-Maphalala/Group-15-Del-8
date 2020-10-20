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
  selector: 'app-view-completed-jobs',
  templateUrl: './view-completed-jobs.component.html',
  styleUrls: ['./view-completed-jobs.component.scss'],
})
export class ViewCompletedJobsComponent implements OnInit {


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

this.loadAlljobs();  

  }


  loadAlljobs() {  
    window.sessionStorage.setItem("EmployeeID","12");
    this.alljobs = this.manService.GetDoneJobs(Number( window.sessionStorage.getItem("EmployeeID")));  
    console.log(this.alljobs);
  } 




}
