import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs'; 
import { Employee } from 'src/classes/Employee';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/employees.service';
import { EmployeeType } from 'src/classes/employee-type';
import { UserType } from 'src/app/Classes/usertype';
@Component({
  selector: 'employee',
  templateUrl: 'employee.component.html',
  styleUrls: ['employee.component.sass']
  ,providers:[EmployeeService]
})

export class EmployeeComponent implements OnInit {  
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  employeeForm: any;  
  allemployees: Observable<Employee[]>;  
  user  = new Employee();
  employeetypes: Observable<EmployeeType[]>;  
  usertype: Observable<UserType[]>;  
  employeeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updateEmployeeForm: any; 
  updateEmployee:any;
  product:Employee[];
  searchedKeyword: string;
  hideinput: boolean;
  Check: any;
  Checking = 1;
  canadd: boolean =true;
  showNotSA: boolean =true;
  showSA: boolean =true;
  show: boolean;
  usrEx: boolean;
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  @ViewChild('content2') content2 : any;
  constructor(private router: Router, private httpService: HttpClient,private modalService: NgbModal,private formbulider: FormBuilder,private employeeService:EmployeeService) { }  
  ngOnInit(): void {  
    if (sessionStorage.getItem('EmployeeID') == null) {
      this.router.navigate(['']);
    }

    this.updateEmployeeForm = this.formbulider.group({  
      EMPLOYEEID:['', [Validators.required]], 
     USERID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID: ['',],
 //     DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO: ['',],
     EMPLOYEETYPEID:['', [Validators.required,Validators.maxLength(13)]], 
    //  USERNAME: ['', [Validators.required]], 
    //  USERID: ['', [Validators.required]], 
      //PASSWORD: ['', [Validators.required]], 
      EMAIL:  ['', [Validators.required]], 
      PHONE_NUMBER:  ['', [Validators.required]], 
   
    })  
    this.employeeForm = this.formbulider.group({  
      USERTYPEID:['', [Validators.required]],  
      NAME:['', [Validators.required]],  
      SURNAME: ['', [Validators.required]],  
      EMPLOYEENATIONALID: ['',],
      //DATEEMPLOYED:['', [Validators.required]],  
      DATEOFBIRTH:['', [Validators.required]],  
      EMPLOYEEPASSPORTNO: ['',],
      EMPLOYEETYPEID:['', [Validators.required]],
      USERNAME: ['',[Validators.required,Validators.pattern("^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$")]], 
      PASSWORD: ['', [Validators.required]], 
      EMAIL:  ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      PHONE_NUMBER:  ['',[Validators.required, Validators.pattern("[0-9]*"),Validators.maxLength(10),Validators.minLength(10)]],
    //  Nationality:['', [Validators.required]], 
        }) 
    this.loadAllemployees();  
    this.GetEmployeetype();  
    this.GetUsertype();  
    
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadAllemployees() {  
    
    this.allemployees = this.employeeService.getAllEmployee();  
  }  
  GetEmployeetype() {  
    this.employeetypes = this.employeeService.GETEmployeetype();  
}  
GetUsertype() {  
    this.usertype = this.employeeService.GetUserType();  
}  
    
openWindowCustomClass() {
  this.modalService.open(this.content,{ centered: true });
}
openWindowCustomClass1() {
  this.modalService.open(this.content1,{ centered: true });
}
openWindowCustomClass2() {
  this.modalService.open(this.content2,{ centered: true });
}
  
   onFormSubmit() {  debugger;
    this.usrEx = false;
    this.user = this.employeeForm.value;
    this.employeeService.Checkusername(this.user.USERNAME).toPromise().then(r => {
      console.log(r);debugger;
      if(Boolean(r)==true)
      {

        this.usrEx = true;
        this.canadd = false;
      }else{
        this.addemployee(employees);
      }
    }),

     this.dataSaved = false;  
     const employees = this.employeeForm.value;  
    // this.Createemployee(employees);  
     this.employeeForm.reset();  
   }  
   onFormSubmitUpdateEmployee() {  
        this.dataSaved = false;  
        const Employee = this.updateEmployeeForm.value;  
        this.UpdateEmployee(Employee);  
        this.updateEmployeeForm.reset();  
        
      }  
  

      
  loademployeeToEdit(employeeId: string) {  debugger;
    this.employeeService.getEmployeeById(employeeId).subscribe(employees=> {  
      console.log(employees)
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employees.EMPLOYEEID;  
      this.updateEmployeeForm.controls['EMPLOYEEID'].setValue(employees.EMPLOYEEID); 
      this.updateEmployeeForm.controls['USERID'].setValue(employees.USERID); 
      this.updateEmployeeForm.controls['EMPLOYEETYPEID'].setValue(employees.EMPLOYEETYPEID); 
      this.updateEmployeeForm.controls['EMPLOYEENATIONALID'].setValue(employees.EMPLOYEENATIONALID); 
      this.updateEmployeeForm.controls['EMPLOYEEPASSPORTNO'].setValue(employees.EMPLOYEEPASSPORTNO); 
    //  this.updateEmployeeForm.controls['DATEEMPLOYED'].setValue(employees.DATEEMPLOYED); 
      this.updateEmployeeForm.controls['NAME'].setValue(employees.NAME);  
      this.updateEmployeeForm.controls['SURNAME'].setValue(employees.SURNAME);  
      this.updateEmployeeForm.controls['DATEOFBIRTH'].setValue(employees.DATEOFBIRTH);  
      this.updateEmployeeForm.controls['PHONE_NUMBER'].setValue(employees.PHONE_NUMBER); 
      this.updateEmployeeForm.controls['EMAIL'].setValue(employees.EMAIL);   
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
UpdateEmployee(employees: Employee){
      debugger;
          this.employeeService.updateEmployee(employees).subscribe(() => {  
            this.dataSaved = true;  
            this.closebutton.nativeElement.click(); 
            this.massage = 'Record Updated Successfully';  
            this.loadAllemployees(); 
    
            this.GetEmployeetype();  
            this.GetUsertype();           
            this.employeeIdUpdate = null;
            this.openWindowCustomClass1();
            this.modalService.dismissAll()   
            this.updateEmployeeForm.reset(); }
          );
      
        }
  
  
  
        
  //  Createemployee(employees: Employee) {  
  //    if (this.employeeIdUpdate == null) {  debugger;
  //      this.employeeService.createEmployee(employees).subscribe(  
  //        () => {  
  //          this.dataSaved = true;  
  //         this.massage = 'Record saved Successfully';  
  //          this.loadAllemployees();  
  //          this.employeeIdUpdate = null;  
  //          this.employeeForm.reset();  
  //        }  
  //      );  
  //    } 
  // }   
  
  deleteemployee(employeeId: string) {  
    if (confirm("Are you sure you want to Deactivate this Employee?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Employee Deactivated Succefully';  
      this.loadAllemployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  

  
  
  }  
  onNationalityChange(value){
    if(value=="South African")
    {
      this.showNotSA=true;
this.showSA=false;
this.employeeForm.controls['EMPLOYEEPASSPORTNO'].setValue(null);
    }
else
{this.showSA=true;
  this.showNotSA=false;
  this.employeeForm.controls['EMPLOYEENATIONALID'].setValue(null);

}
  }

  check(value){
if(value==null)
{
this.show=true;
}
else{
  this.show=false;
}


  }
  Reactivate(employeeId: string) {  
    if (confirm("Are you sure you want to Reactivate this Employee?")) {   
    this.employeeService.ReactivateEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Employee Deactivated Succefully';  
      this.loadAllemployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
}

Createemployee(employees: Employee){

  this.employeeService.Checkusername(this.user.USERNAME).subscribe(data =>{

    this.Check = data; debugger;
    if (this.Check.length == 0)
    {
      this.Checking = 0

      if (this.Checking == 0)
  {

    this.canadd == true;
    this.addemployee(employees);  
  }
 
    }
    else {
   
this.canadd == false;
   
    }
  });
}




addemployee(employees: Employee) {  
  if (this.employeeIdUpdate == null) {  debugger;
    this.employeeService.createEmployee(employees).subscribe(  
      () => {  
        this.dataSaved = true;  
       this.massage = 'Record saved Successfully';  
        this.loadAllemployees();  
        this.GetEmployeetype();  
        this.GetUsertype();    
        this.employeeIdUpdate = null;  
        this.closebutton.nativeElement.click(); 
        this.openWindowCustomClass(); 
        this.employeeForm.reset();  
      }  
    );  
  } 
}   



  resetForm() {  
     this.employeeForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     hideInput(ACTIVE){
    
      if(ACTIVE=="ACTIVE")
      
      {
        this.hideinput=true;
       
      }
  else{
    this.hideinput=false;
  }
  
  
    }
    

    
  
}
