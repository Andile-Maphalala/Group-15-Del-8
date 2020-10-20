import { Component, OnInit, ViewChild } from '@angular/core';
import { MakePaymentService } from '../make-payment.service';
import { BookingService } from '../booking.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AcceptRentalAgree } from 'src/app/accept-rental-agree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-accept-rental-agreement',
  templateUrl: './accept-rental-agreement.component.html',
  styleUrls: ['./accept-rental-agreement.component.css']
})
export class AcceptRentalAgreementComponent implements OnInit {
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  @ViewChild('content2') content2 : any;
  allAgreements:any;
  Checked:boolean;
  acceptRentalAgree= new AcceptRentalAgree();
  RENTALAPPLICATIONId: number;
  searching: boolean;
  constructor(private modalService: NgbModal,private httpService: HttpClient,private bookingService:BookingService ) { }

  ngOnInit(): void {
    this.GetAllAgreements();
    
  }
  GetAllAgreements(){
    // this.RENTALAPPLICATIONId=sessionStorage.getItem('RENTALAPPLICATIONID')
     this.bookingService.getAgreements(sessionStorage.getItem('RENTALAPPLICATIONID')).toPromise().then(data => {//ClientID
       this.allAgreements = data; debugger;
      console.log(data);
       debugger;
    });
}
Submit(ph){debugger;
  this.searching=true;
  if (this.Checked==true){
    
    this.acceptRentalAgree.PROPERTYID=ph;
    this.acceptRentalAgree.CLIENTID=sessionStorage.getItem('clientID');
    this.acceptRentalAgree.RENTALAPPLICATIONID=sessionStorage.getItem('RENTALAPPLICATIONID');
    this.bookingService.addRentalAgreement(this.acceptRentalAgree).subscribe(ss=>{
      this.searching=false;
      debugger;
this.accept();

    });

  }
  else{

    this.bookingService.Reject(Number(sessionStorage.getItem('RENTALAPPLICATIONID'))).subscribe(ss=>{
      this.searching=false;
    this.reject();


    });
  }
}
ChangeToTrue(){
  this.Checked=true;
}

ChangeToFalse(){
  this.Checked=false;
}


//Call reject modal
reject() {
  this.modalService.open(this.content1,{ centered: true });
} 
//Call accept modal
accept() {
  this.modalService.open(this.content,{ centered: true });
} 
//Call payment modal
payment() {
  
  this.modalService.open(this.content2,{ centered: true });

} 

  }