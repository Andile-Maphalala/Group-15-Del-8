import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 

//import{AutologoutService} from '../autologout.service';
//import { Times } from 'src/classes/Times';
import { Router } from '@angular/router';
import { Times } from '../Times';
import { AutologoutService } from '../autologout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adjusttime',
  templateUrl: './adjusttime.component.html',
  styleUrls: ['./adjusttime.component.css']
})
export class AdjusttimeComponent implements OnInit {
  dataSaved = false;  
  timeForm: any;  
   
  alltimes:any;
  timeIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  product:Times[];
  searchedKeyword: string;
  
  
  
  constructor(private modalService: NgbModal,private router: Router,private formbulider: FormBuilder,private autoservice:AutologoutService) { }  
  ngOnInit(): void {  
    // if (sessionStorage.getItem('EmployeeID') == null) {
    //   this.router.navigate(['']);
    // }

    this.timeForm = this.formbulider.group({  
      //TimeID:['', [Validators.required]], 
      Logouttime:['', [Validators.required,Validators.max(180)]],  
  
    })  
   
    this.GetLogOutTime();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
 GetLogOutTime() {  debugger;
    this.alltimes = this.autoservice.getLogOutTime();  
  }  

    
  
  
   onFormSubmit() {  debugger;
        this.dataSaved = false;  
        const Employee = this.timeForm.value;  
        this.UpdateTime(Employee);  
        this.timeForm.reset();  
        
      }  
  

      
//   loadtimeToEdit(timeID: string) {
//     this.autoservice.getEmployeeById(timeID).subscribe(timez=> {  
//       this.massage = null;  
//       this.dataSaved = false;  
//       this.timeIdUpdate = timez.EMPLOYEEID;  
//       this.time.controls['EMPLOYEEID'].setValue(timez.EMPLOYEEID); 
//       this.time.controls['USERID'].setValue(timez.USERID); 
//  ;  
          
//     }); 
//   }
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
UpdateTime(timez: Times){
      debugger;
          this.autoservice.SetLogoutTime(timez).subscribe(() => {  
          this.modalService.dismissAll();
          this.openWindowCustomClass1();
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.GetLogOutTime();  
            this.timeIdUpdate = null;  
            this.timeForm.reset(); }
          );
      
        }
        @ViewChild('content') content : any;
        @ViewChild('content1') content1 : any;

    
        openWindowCustomClass() {
          this.modalService.open(this.content,{ centered: true });
        }
  
        openWindowCustomClass1() {
          this.modalService.open(this.content1,{ centered: true });
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
  
  // deleteemployee(employeeId: string) {  
  //   if (confirm("Are you sure you want to delete this ?")) {   
  //   this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
  //     this.dataSaved = true;  
  //     this.massage = 'Record Deleted Succefully';  
  //     this.loadAllemployees();  
  //     this.employeeIdUpdate = null;  
  //     this.employeeForm.reset();  
  
  //   });  
  // }  
  // }  
  resetForm() {  
     this.timeForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
