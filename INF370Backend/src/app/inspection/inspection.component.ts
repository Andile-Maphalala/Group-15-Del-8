import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { OnlineLink } from '../Global';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  Schedule: any;
  Form: any;
  allslots: any;
  allemployees: any;
  date: string;
  searching: boolean;
  @ViewChild('content') content : any;

  constructor(private modalService: NgbModal,private _Router : Router ,private httpService: HttpClient,private formbulider: FormBuilder,private adminService:AdminService,private manService:MaintenanceService) { }

  ngOnInit(): void {
    
    this.Form = this.formbulider.group({ 
    EMPLOYEEID: ['', [Validators.required]], 

    INSPECTIONDATE: ['', [Validators.required]],  
 
    SLOTID: ['', [Validators.required]], 
  } ); 

  this.loadAllemployees();
  this.loadAllslots();
  const today = new Date();
  var pipe = new DatePipe('en-ZA'); // Use your own locale
  this.date =pipe.transform(today,'yyyy-MM-dd');
  }


  loadAllslots() {  
    this.allslots = this.manService.getAllSlots();  
}  

OnSubmit()
{
this.searching=true;
  const EmployeeType = this.Form.value;  
  EmployeeType.INSPECTIONID=window.sessionStorage.getItem("InspectionID");
  this.adminService.addInspect(EmployeeType).subscribe(() => {

this.searching=false;

this._Router.navigate(['ScheduleInspection']);

this.openWindowCustomClass();
   }); 


}
openWindowCustomClass() {
  this.modalService.open(this.content,{ centered: true });
}


     
loadAllemployees() {  
  this.allemployees = this.adminService.getAllEmployee();  
}  


  loadSchedule(){

    this.httpService.get(OnlineLink + 'Api/Admin/AllSchedulebyId/'+window.sessionStorage.getItem("InspectionID")).subscribe(  
      data => {
  this.Schedule=data;
  


  
      })
  
  
  }
  
}
