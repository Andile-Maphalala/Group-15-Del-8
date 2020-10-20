import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from } from 'rxjs'; 
import {Inspection} from "src/app/models/inspection"
import { AdminService } from 'src/app/Services/admin.service';
import { MaintenanceService } from 'src/app/Services/maintenance.service';
import { InspectionService } from 'src/app/Services/inspection.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-move-out',
  templateUrl: './move-out.component.html',
  styleUrls: ['./move-out.component.scss'],
})
export class MoveOutComponent implements OnInit {

  @ViewChild('content') content : any;
  @ViewChild('success') success : any;


  dataSaved = false;  
  propertytypeForm: any;  
  allemployees: Observable<Inspection[]>;  
  inspectionIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updatePropertytypeForm: any; 
  updateProperty:any;
  product:Inspection[];
  searchedKeyword:string;
  Schedule: any;
  Form: any;
  


  constructor(private modalService: NgbModal,private formbulider: FormBuilder,private InspectionService:InspectionService,private _Router : Router,
    private httpService: HttpClient,private manService:MaintenanceService ,private adminService:AdminService ) { }  


  ngOnInit(): void {  
    if (sessionStorage.getItem('EmployeeID') == null) {
      this._Router.navigate(['']);
    }

    this.updatePropertytypeForm = this.formbulider.group({  
      INSPECTIONID:['', [Validators.required]],  
      INSPECTIONNOTE:['', [Validators.required]],   
      INSPECTIONDATETIME:['', [Validators.required]], 
    })  
    this.propertytypeForm= this.formbulider.group({  
      
      INSPECTIONID:['', [Validators.required]],  
      INSPECTIONNOTE:['', [Validators.required]],   
      INSPECTIONDATETIME:['', [Validators.required]], 
      
        })


  this.Form = this.formbulider.group({ 
    INSPECTIONPASSED: ['', [Validators.required]],  
    INSPECTIONNOTE: ['', [Validators.required]], 
        } ); 
    this.loadSchedule();  
  }
  


  OnSubmit(){ debugger;
    //this.searching=true;

  

    if(this.Form.value.INSPECTIONPASSED=="True")
    {
      const EmployeeType = this.Form.value;  
      EmployeeType.INSPECTIONID=window.sessionStorage.getItem("InspectionID");
      this.adminService.FailInspect(EmployeeType).subscribe(hh=>{
        //this.searching=false;
        this.modalService.dismissAll();
        this.modalService.open(this.success,{ centered: true });
        
        //this.openWindowCustomClass();
      }); 

    }
  else{
    const EmployeeType = this.Form.value;  
    EmployeeType.INSPECTIONID=window.sessionStorage.getItem("InspectionID");
    this.adminService.CompleteInspect(EmployeeType).subscribe(() => {
this.modalService.dismissAll();
      
      this.modalService.open(this.success,{ centered: true });
         }); 
  }
  
  
  
  }

  // loadAllemployees() {  
  //   this.allemployees = this.InspectionService.getAllInspection();  
  // }  

    
  loadSchedule(){
this.InspectionService.getOutInspectionById(window.sessionStorage.getItem("EmployeeID")).subscribe(ii=>{ debugger;

this.Schedule=ii;
if( this.Schedule.length == 0)
{
  this.Schedule == null;
}
debugger;
});



      
  
  
  }

  loadToEdit(value){
    sessionStorage.setItem('InspectionID',value);
    this.modalService.open(this.content,{ centered: true });
  debugger;
  
  }
  

  
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const employees = this.propertytypeForm.value;  
     this.Createemployee(employees);  
     this.propertytypeForm.reset();  
   }  
   onFormSubmitUpdateProperty() {  
        this.dataSaved = false;  
        const Employee = this.updatePropertytypeForm.value;  
        this.UpdateEmployee(Employee);  
        this.updatePropertytypeForm.reset();  
        
      }  
  

      
  loademployeeToEdit(employeeId: string) {  
    this.InspectionService.getInspectionById(employeeId).subscribe(employees=> {  
      this.massage = null;  
      this.dataSaved = false;  
      // this.inspectionIdUpdate = employees.INSPECTIONID;
      // this.updatePropertytypeForm.controls['INSPECTIONID'].setValue(employees.INSPECTIONID);
      // this.updatePropertytypeForm.controls['INSPECTIONNOTE'].setValue(employees.INSPECTIONNOTE);
      // this.updatePropertytypeForm.controls['INSPECTIONDATETIME'].setValue(employees.INSPECTIONDATETIME);
      
          
    }); 
  }
   

 

UpdateEmployee(employees:Inspection){
      debugger;
          this.InspectionService.updateInspection(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            // this.loadAllemployees();  
            this.inspectionIdUpdate = null;  
            this.updatePropertytypeForm.reset(); }
          );
      
        }
  
  
  
   Createemployee(employees: Inspection) {  
     if (this.inspectionIdUpdate == null) {  debugger;
       this.InspectionService.createProperty(employees).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          //  this.loadAllemployees();  
           this.inspectionIdUpdate = null;  
           this.propertytypeForm.reset();  
         }  
       );  
     } 
  }   
  
  deleteemployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.InspectionService.deleteInspectionById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      // this.loadAllemployees();  
      this.inspectionIdUpdate = null;  
      this.propertytypeForm.reset();  
  
    });  
  }  
  }  




/////////////////////////////////////////////////////////////
}
