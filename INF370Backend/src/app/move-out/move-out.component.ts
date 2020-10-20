import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs'; 
import {Inspection} from "src/app/models/inspection"
import { InspectionService } from '../Services/inspection.service';

@Component({
  selector: 'app-move-out',
  templateUrl: 'move-out.component.html',
  styleUrls: ['move-out.component.css']
  ,providers:[InspectionService]
})

export class MoveOutComponent implements OnInit {  
  dataSaved = false;  
  propertytypeForm: any;  
  allemployees: Observable<Inspection[]>;  
  employeeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updatePropertytypeForm: any; 
  updateProperty:any;
  product:Inspection[];

  
  
  
  constructor(private formbulider: FormBuilder,private InspectionService:InspectionService) { }  
  ngOnInit(): void {  
    this.updatePropertytypeForm = this.formbulider.group({  
      INSPECTIONTYPEID:['', [Validators.required]],  
      INSPECTION_STATUS_ID:['', [Validators.required]], 
      INSPECTIONNOTE:['', [Validators.required]],   
      INSPECTIONDATETIME:['', [Validators.required]], 
    })  
    this.propertytypeForm= this.formbulider.group({  
      
      INSPECTIONTYPEID:['', [Validators.required]],  
      INSPECTION_STATUS_ID:['', [Validators.required]], 
      INSPECTIONNOTE:['', [Validators.required]],   
      INSPECTIONDATETIME:['', [Validators.required]], 
      
        }) 
    this.loadAllemployees();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    this.allemployees = this.InspectionService.getAllInspection();  
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
      // this.employeeIdUpdate = employees.INSPECTIONTYPEID;
      // this.updatePropertytypeForm.controls['INSPECTIONTYPEID'].setValue(employees.INSPECTIONTYPEID);
      // this.updatePropertytypeForm.controls['INSPECTION_STATUS_ID'].setValue(employees.INSPECTION_STATUS_ID);
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
            this.employeeIdUpdate = null;  
            this.updatePropertytypeForm.reset(); }
          );
      
        }
  
  
  
   Createemployee(employees: Inspection) {  
     if (this.employeeIdUpdate == null) {  debugger;
       this.InspectionService.createProperty(employees).subscribe(  
         () => {  
           this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
           this.loadAllemployees();  
           this.employeeIdUpdate = null;  
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
      this.employeeIdUpdate = null;  
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