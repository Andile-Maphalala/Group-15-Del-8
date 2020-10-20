import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/classes/Jobs';
// import { RequestedjobsService } from 'src/app/requestedjobs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestedjobsService } from '../requestedjobs.service';

@Component({
  selector: 'app-viewrequestedjobs',
  templateUrl: './viewrequestedjobs.component.html',
  styleUrls: ['./viewrequestedjobs.component.css']
})
export class ViewrequestedjobsComponent implements OnInit {
  alljobs: Observable<Job[]>;  
  jobForm: any;
  searchedKeyword: string;

  constructor(private modalService: NgbModal,private formbulider: FormBuilder,private reqService:RequestedjobsService) { }  

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
    })  
    this.loadAlljobs();  
  
  }
  loadAlljobs() {  
    this.alljobs = this.reqService.GetReqJobs(Number( window.sessionStorage.getItem("clientID")));  debugger;
  }  

}
