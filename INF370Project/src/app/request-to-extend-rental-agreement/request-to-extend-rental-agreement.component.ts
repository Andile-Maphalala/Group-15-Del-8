import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MakePaymentService } from '../make-payment.service';
import { Terminate } from '../terminate';
import { TerminatedAgree } from '../terminated-agree';

@Component({
  selector: 'app-request-to-extend-rental-agreement',
  templateUrl: './request-to-extend-rental-agreement.component.html',
  styleUrls: ['./request-to-extend-rental-agreement.component.css']
})
export class RequestToExtendRentalAgreementComponent implements OnInit {

  dataSaved = false;  
  extendedForm: any;  
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
  date: string;
  available = true;
  constructor(private modalService: NgbModal ,private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder) { }
  ngOnInit()  :void {this.GetAllRentalAgreements2();
    this.extendedForm = this.formbuilderUpdate.group({  
  
  
      RentalAgreementID: ['', [Validators.required]], 
      ExtensionPeriod: ['', [Validators.required]],   
         

    });
  }
    GetAllRentalAgreements2(){
      this.apiService.getRentalAgreement2(sessionStorage.getItem('clientID')).toPromise().then(data => {//ClientID
        this.allRentals = data; debugger;
        if (this.allRentals.length == 0) 
        {
          this.available = false;
        }
        console.log(data);
        debugger;
      });
    }
    GetAmount(ReferenceNo:string){debugger;
      this.extendedForm.controls['ExtensionDate'].setValue(' ');       
      this.apiService.getDate(ReferenceNo).toPromise().then(data => {//ClientID
        this.AmountDue = data.toString(); debugger;
        var pipe = new DatePipe('en-ZA'); // Use your own locale
        this.date =pipe.transform(this.AmountDue,'yyyy-MM-dd');

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
this.Terminate=this.extendedForm.value; debugger;
this.apiService.sendExtension(this.Terminate).subscribe(data=>{
  debugger;
  this.openWindowCustomClass();
  //this.myBooking();
  
});

}}