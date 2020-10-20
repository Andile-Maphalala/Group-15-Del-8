import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MakePaymentService } from '../make-payment.service';
import { Terminate } from '../terminate';
import { TerminatedAgree } from '../terminated-agree';

@Component({
  selector: 'app-request-maintenance-job',
  templateUrl: './request-maintenance-job.component.html',
  styleUrls: ['./request-maintenance-job.component.css']
})
export class RequestMaintenanceJobComponent implements OnInit {
  dataSaved = false;  
  maintenanceForm: any;  
  allTerminated: Observable<TerminatedAgree[]>;  
  terminatedIdUpdate = null;  
  massage = null;  
  url="http://formspree.io/nhlanhlakhosa69@gmail.com";
  totalAmount = 0;
  allRentals:any; 
  searchForm: any; 
  AmountDue:any;
  selected:any;
  Terminate = new Terminate();
  @ViewChild('content') content : any;
  constructor(private modalService: NgbModal ,private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder) { }  
  
  ngOnInit()  :void {this.GetAllRentalAgreements3();
    this.maintenanceForm = this.formbuilderUpdate.group({  
  
  
      RentalAgreementID: ['', [Validators.required]], 
      MaintenanceReason: ['', [Validators.required]],   
      

    });
  }
    GetAllRentalAgreements3(){
      this.apiService.getRentalAgreement3(sessionStorage.getItem('clientID')).toPromise().then(data => {//ClientID
        this.allRentals = data; debugger;
        console.log(data);
        debugger;
      });
    }
    GetAmount(ReferenceNo:string){debugger;
      this.apiService.getAmount3(ReferenceNo).toPromise().then(data => {//ClientID
        this.AmountDue = data.toString(); debugger;
        
      });
    }
    public onOptionsSelected(event) {debugger;
      const value = event.target.value;
      this.selected = value;
      console.log(value);
   }

   openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }


   OnSubmit(){
this.Terminate=this.maintenanceForm.value; debugger;
this.apiService.sendMaintenance(this.Terminate).subscribe(data=>{
 this.openWindowCustomClass();
  //this.myBooking();
  
});


   }
    }
  
