import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MakePaymentService } from '../make-payment.service';
import { Terminate } from '../terminate';



@Component({
  selector: 'app-request-maintenace-job',
  templateUrl: './request-maintenace-job.component.html',
  styleUrls: ['./request-maintenace-job.component.css']
})
export class RequestMaintenaceJobComponent implements OnInit {
  dataSaved = false;  
  maintenanceForm: any;  
  allTerminated: Observable<Terminate[]>;  
  terminatedIdUpdate = null;  
  massage = null;  
  
  totalAmount = 0;
  allRentals:any; 
  searchForm: any; 
  AmountDue:any;
  selected:any;
  Terminate = new Terminate();
  
  constructor(private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder) { }  
  
  ngOnInit()  :void {this.GetAllRentalAgreements3();
    this.maintenanceForm = this.formbuilderUpdate.group({  
  
  
      RentalAgreementID: ['', [Validators.required]], 
      MaintenanceReason: ['', [Validators.required]],   
      

    });
  }
    GetAllRentalAgreements3(){
      this.apiService.getRentalAgreement1(sessionStorage.getItem('clientID')).toPromise().then(data => {//ClientID
        this.allRentals = data; debugger;
        console.log(data);
        debugger;
      });
    }
    GetAmount(ReferenceNo:string){debugger;
      this.apiService.getAmount1(ReferenceNo).toPromise().then(data => {//ClientID
        this.AmountDue = data.toString(); debugger;
        
      });
    }
    public onOptionsSelected(event) {debugger;
      const value = event.target.value;
      this.selected = value;
      console.log(value);
   }

   OnSubmit(){
this.Terminate=this.maintenanceForm.value; debugger;
this.apiService.sendMaintenance(this.Terminate).subscribe(data=>{
  debugger;7
  //this.myBooking();
  
});


   }
    }
  
