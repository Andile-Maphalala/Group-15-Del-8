import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Payment } from '../payment';
import { PropertyService } from '../Services/property.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor(private halo:ApiService,private httpService: HttpClient, private _Router : Router,) { }

  ngOnInit(): void {
    this.pay();
    debugger;
  }
  // 
  Payment = new Payment();

pay(){

// this.Payment.PAYMENTTYPEID=Number(window.sessionStorage.getItem("Type"));
// // this.Payment.PAYMENTTYPEID=
// this.Payment.PAYMENT_AMOUNT=window.sessionStorage.getItem("AmountDue");
// this.Payment.PAYMENT_REFERENCE_NO=window.sessionStorage.getItem("ReferenceNO.");
  // this.httpService.get('http://localhost:30135/Api/MakePayment/AddPayment/' +this.clientID).subscribe(
  //   data => {})

  // this.httpService.get('https://api.payfast.co.za').subscribe(  
  //   data => { debugger;})

// this.halo.AddPayment(this.Payment).subscribe(LL=>{
// debugger;

// window.sessionStorage.removeItem("AmountDue");
// window.sessionStorage.removeItem("Type");
// window.sessionStorage.removeItem("ReferenceNO.");
// window.sessionStorage.setItem("Paid","true");
// this._Router.navigate(['success']);


// });
var refNum = Number(window.sessionStorage.getItem("ReferenceNO."));
this.halo.AddPayment(refNum).subscribe(LL=>{
 
  
  window.sessionStorage.removeItem("AmountDue");
  window.sessionStorage.removeItem("Type");
  window.sessionStorage.removeItem("ReferenceNO");
  window.sessionStorage.setItem("Paid","true");
  this._Router.navigate(['success']);
  
  
  });

}


}
