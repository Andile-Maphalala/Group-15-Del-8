import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeType } from 'src/classes/employee-type';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-employee-type',  
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.css']
})
export class EmployeeTypeComponent implements OnInit {
    //Area
    @ViewChild('closebutton') closebutton;
    @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  employeeTypeForm: any; 
  updateEmployeeTypeForm: any; 
  updateEmployeeType:any;
  allEmployeeType: Observable<EmployeeType[]>;  
  product:EmployeeType[];
  employeeTypeUpdate = null;  
  message = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  searchedKeyword: string;
  constructor(private formbuilder: FormBuilder,private formbuilderUpdate: FormBuilder,private ApiService:ApiService) { }

  ngOnInit(): void {
    this.updateEmployeeTypeForm = this.formbuilder.group({  
  
  
      EMPLOYEETYPEDESCRIPTION: ['', [Validators.required]],  
      EMPLOYEETYPEID: ['', [Validators.required]],  
    });
    this.employeeTypeForm = this.formbuilderUpdate.group({  
  
  
      EMPLOYEETYPEDESCRIPTION: ['', [Validators.required]],  
    });
this.loadAllEmployeeTypes();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadAllEmployeeTypes() {  
    this.allEmployeeType = this.ApiService.getAllEmployeeType();  
    debugger;
  }  

    
  onFormSubmitEmployeeType() {  
    this.dataSaved = false;  
    const EmployeeType = this.employeeTypeForm.value;  
    this.CreateEmployeeType(EmployeeType);  
    this.employeeTypeForm.reset();  
  }  

  onFormSubmitUpdateEmployeeType() {  
    this.dataSaved = false;  
    const EmployeeType = this.updateEmployeeTypeForm.value;  
    this.UpdateEmployeeType(EmployeeType);  
    this.updateEmployeeTypeForm.reset();  
    
  }  


  loadEmployeeTypeToEdit(EmployeeTypeId: string) {  
  
    this.ApiService.getEmployeeTypeById(EmployeeTypeId).subscribe(employeeType=> {  
      console.log(employeeType);
      this.message = null;  
      this.dataSaved = false;  
      this.updateEmployeeTypeForm.controls['EMPLOYEETYPEDESCRIPTION'].setValue(employeeType.EMPLOYEETYPEDESCRIPTION);        

      this.updateEmployeeTypeForm.controls['EMPLOYEETYPEID'].setValue(employeeType.EMPLOYEETYPEID); 
            
  
      
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

  UpdateEmployeeType(employeeType: EmployeeType){
debugger;
    this.ApiService.updateEmployeeType(employeeType).subscribe(() => {  
      this.closebutton.nativeElement.click(); 
      this.dataSaved = true;  
      this.message = 'Record Updated Successfully';  
      this.loadAllEmployeeTypes();  
      this.employeeTypeUpdate = null;  
      this.updateEmployeeTypeForm.reset(); }
    );

  }


  CreateEmployeeType(employeeType: EmployeeType) {  
  
      this.ApiService.createEmployeeType(employeeType).subscribe(  
        () => {  this.addTypeclosebutton.nativeElement.click(); 
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllEmployeeTypes();  
          this.employeeTypeUpdate = null;  
          this.employeeTypeForm.reset();  
        }  
      );  
  } 



  deleteEmployeeType(employeeTypeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.ApiService.deleteEmployeeTypeById(employeeTypeId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllEmployeeTypes();
      this.employeeTypeUpdate = null;  
      this.employeeTypeForm.reset();  
  
    });  
  } }

  // resetFormUserType() {  
  //   this.userTypeForm.reset();  
  //   this.messageUserType= null;  
  //   this.userTypeForm = false;  
  // } 



}
