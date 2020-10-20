import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs'; 
import {PropertTypeService} from 'src/app/Services/propert-type.service';
import {PropertType} from 'src/app/models/propert-type';

@Component({
  selector: 'app-add-property-type',
  templateUrl: 'add-property-type.component.html',
  styleUrls: ['add-property-type.component.css']
  ,providers:[PropertTypeService]
})

export class AddPropertyTypeComponent implements OnInit {  
  dataSaved = false;  
  propertytypeForm: any;  
  allemployees: any;  
  employeeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updatePropertytypeForm: any; 
  updateProperty:any;
  product:PropertType[];
  searchedKeyword: string;

  @ViewChild('closebutton') closebutton;

  
  
  
  constructor(private formbulider: FormBuilder,private PropertTypeService:PropertTypeService) { }  
  ngOnInit(): void {  
    this.updatePropertytypeForm = this.formbulider.group({  
      PROPERTYTYPEID:['', [Validators.required]],  
      PROPERTTYPEDESCRIPTION:['', [Validators.required]], 
 
    })  
    this.propertytypeForm= this.formbulider.group({  
      
        PROPERTYTYPEID:['', [Validators.required]],  
        PROPERTTYPEDESCRIPTION:['', [Validators.required]], 
      
        }) 
    this.loadAllemployees();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    this.PropertTypeService.getAllPropertType().subscribe(ff=>{  this.allemployees =ff;
    
      debugger;
    });  
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
    this.PropertTypeService.getPropertTypeById(employeeId).subscribe(employees=> { debugger;  
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employees.PROPERTYTYPEID;  
      this.updatePropertytypeForm.controls['PROPERTYTYPEID'].setValue(employees.PROPERTYTYPEID); 
      this.updatePropertytypeForm.controls['PROPERTTYPEDESCRIPTION'].setValue(employees.PROPERTTYPEDESCRIPTION); 
      // this.updatePropertytypeForm.controls['TIMESVISITED'].setValue(employees.TIMESVISITED);
     
      
          
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
UpdateEmployee(employees: PropertType){
      debugger;
      
          this.PropertTypeService.updatePropertType(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.loadAllemployees();  
            this.closebutton.nativeElement.click(); 
            this.employeeIdUpdate = null;  
            this.updatePropertytypeForm.reset(); }
          );
      
        }
  
  
  
   Createemployee(employees: PropertType) {  
     if (this.employeeIdUpdate == null) {  debugger;
       this.PropertTypeService.createProperty(employees).subscribe(  
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
    this.PropertTypeService.deletePropertTypeById(employeeId).subscribe(() => {  
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