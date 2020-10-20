import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from } from 'rxjs'; 
import {Inspection} from "src/app/models/inspection"
import { AdminService } from '../admin.service';
import { MaintenanceService } from '../maintenance.service';
import { InspectionService } from '../Services/inspection.service';

@Component({
  selector: 'app-move-in',
  templateUrl: 'move-in.component.html',
  styleUrls: ['move-in.component.css']
  ,providers:[InspectionService]
})

export class MoveInComponent implements OnInit {  
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
  
  
  
  constructor(private formbulider: FormBuilder,private InspectionService:InspectionService,private modalService: NgbModal,private _Router : Router ,private httpService: HttpClient,private adminService:AdminService,private manService:MaintenanceService) { }  
  ngOnInit(): void {  
    
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
    this.loadSchedule();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    this.allemployees = this.InspectionService.getAllInspection();  
  }  

    
  loadSchedule(){
this.InspectionService.getInspectionById(window.sessionStorage.getItem("EmployeeID")).subscribe(ii=>{

this.Schedule=ii;
debugger;
});


  
      
  
  
  }

  loadToEdit(value){
    sessionStorage.setItem('InspectionID',value);
  
    this._Router.navigate(['CompleteInspection']);
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
UpdateEmployee(employees:Inspection){
      debugger;
          this.InspectionService.updateInspection(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAllemployees();  
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
           this.loadAllemployees();  
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
      this.loadAllemployees();  
      this.inspectionIdUpdate = null;  
      this.propertytypeForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.propertytypeForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}