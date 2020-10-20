import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TerminatedAgree } from '../terminated-agree';
import { FormBuilder, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { TerminateRService } from '../terminate-r.service';
import { MakePaymentService } from '../make-payment.service';
import { Terminate } from '../terminate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-request-to-terminate-rental-agreement',
  templateUrl: './request-to-terminate-rental-agreement.component.html',
  styleUrls: ['./request-to-terminate-rental-agreement.component.css']
})
export class RequestToTerminateRentalAgreementComponent implements OnInit {

  dataSaved = false;  
  terminatedForm: any;  
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
  EndDate: string;

  
  constructor(private modalService: NgbModal ,private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder) { }  
  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  ngOnInit()  :void {

var pipe = new DatePipe('en-ZA'); // Use your own locale


const today = new Date()
const days = new Date(today)
var format=days.setDate(days.getDate() + 30)
this.date =pipe.transform(format,'yyyy-MM-dd')

    
    this.GetAllRentalAgreements1();
    this.terminatedForm = this.formbuilderUpdate.group({  
  
  
      RentalAgreementID: ['', [Validators.required]], 
      TerminationDate: ['', [Validators.required]],   
      TerminationReason: ['', [Validators.required]],   

    });
  }
    GetAllRentalAgreements1(){
      this.apiService.getRentalAgreement1(sessionStorage.getItem('clientID')).toPromise().then(data => {//ClientID
        this.allRentals = data; debugger;
        if (this.allRentals.length == 0) 
        {
          this.available = false;
        }
       // this.allRentals['RENTALENDDATE'] == this.EndDate;
        
        console.log(data);
        debugger;
      });


  
    }
    GetAmount(ReferenceNo:string){debugger;
      this.apiService.getAmount1(ReferenceNo).toPromise().then(data => {//ClientID
        this.AmountDue = data.toString(); debugger;
        
      });
    }
    Getdate(RENTALAGREEMENTID:string){debugger;
      this.apiService.getDate(RENTALAGREEMENTID).toPromise().then(data => {//ClientID
        this.EndDate = data.toString(); debugger;
        
      });
    }
    public onOptionsSelected(event) {debugger;
      const value = event.target.value;
      this.selected = value;
      console.log(value);
   }

   OnSubmit(){
this.Terminate=this.terminatedForm.value; debugger;
this.apiService.sendTermination(this.Terminate).subscribe(data=>{
  debugger;
  this.openWindowCustomClass();
  //this.myBooking();
  
});


  


// var now = new Date();
// var year = now.getFullYear();
// var month = now.getMonth();
// var day = now.getDay();
// var minDate = moment({year: this.year - 100, month: this.month, day: this.day}).format('YYYY-MM-DD');



   }












    }
  
