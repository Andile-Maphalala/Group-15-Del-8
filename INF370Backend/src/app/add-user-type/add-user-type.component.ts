import { Component, OnInit, ViewChild } from '@angular/core';
import { Usertype} from'src/app/usertype';
import { Observable, from } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-add-user-type',
  templateUrl: './add-user-type.component.html',
  styleUrls: ['./add-user-type.component.css']
})
export class AddUserTypeComponent implements OnInit {
  //Area
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
dataSaved = false;  
employeeTypeForm: any; 
updateEmployeeTypeForm: any; 
updateEmployeeType:any;
allEmployeeType: any;  
product:Usertype[];
employeeTypeUpdate = null;  
message = null;  
showModalBox: boolean = false;
AddshowModalBox: boolean = false;
searchedKeyword: string;
constructor(private router: Router,private formbuilder: FormBuilder,private formbuilderUpdate: FormBuilder,private ApiService: APIService) { }

ngOnInit(): void {

this.loadAllEmployeeTypes();
  this.updateEmployeeTypeForm = this.formbuilder.group({  


    USERTYPEDESCRIPTION: ['', [Validators.required]],  
    USERTYPEID: ['', [Validators.required]],  
  });
  this.employeeTypeForm = this.formbuilderUpdate.group({  


    USERTYPEDESCRIPTION: ['', [Validators.required]],  
  });
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  // this.dataSource.filter = filterValue.trim().toLowerCase();
}

loadAllEmployeeTypes() {  
 this.ApiService.getAllEmployeeType().subscribe(gg=>{  this.allEmployeeType=gg;  });  
  
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
    this.updateEmployeeTypeForm.controls[' USERTYPEDESCRIPTION'].setValue(employeeType.USERTYPEDESCRIPTION);        

    this.updateEmployeeTypeForm.controls['USERTYPEID'].setValue(employeeType.USERTYPEID); 
          

    
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

UpdateEmployeeType(employeeType: Usertype){
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


CreateEmployeeType(employeeType: Usertype) {  

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
