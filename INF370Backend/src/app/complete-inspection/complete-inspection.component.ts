import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.component.html',
  styleUrls: ['./complete-inspection.component.css']
})
export class CompleteInspectionComponent implements OnInit {
  Form: any;
  searching: boolean;

  constructor(private formbulider: FormBuilder,private modalService: NgbModal,private _Router : Router ,private httpService: HttpClient,private adminService:AdminService,private manService:MaintenanceService) { }

  ngOnInit(): void {
    this.Form = this.formbulider.group({ 
  
      INSPECTIONPASSED: ['', [Validators.required]],  
   
      INSPECTIONNOTE: ['', [Validators.required]], 
    } ); 
  }

  OnSubmit(){ debugger;
    this.searching=true;

  

    if(this.Form.value.INSPECTIONPASSED=="True")
    {
      const EmployeeType = this.Form.value;  
      EmployeeType.INSPECTIONID=window.sessionStorage.getItem("InspectionID");
      this.adminService.FailInspect(EmployeeType).subscribe(hh=>{
        this.searching=false;
    
        this._Router.navigate(['MoveIn']);
        
        this.openWindowCustomClass();
      }); 

    }
  else{
    const EmployeeType = this.Form.value;  
    EmployeeType.INSPECTIONID=window.sessionStorage.getItem("InspectionID");
    this.adminService.CompleteInspect(EmployeeType).subscribe(() => {
      this.searching=false;
  
      this._Router.navigate(['MoveIn']);
      
      this.openWindowCustomClass();
         }); 
  }
  
  
  
  }
  @ViewChild('content') content : any;

  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }


}
