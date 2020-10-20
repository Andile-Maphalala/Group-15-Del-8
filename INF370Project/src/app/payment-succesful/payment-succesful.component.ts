import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-succesful',
  templateUrl: './payment-succesful.component.html',
  styleUrls: ['./payment-succesful.component.css']
})
export class PaymentSuccesfulComponent implements AfterViewInit {
  @ViewChild('content') content : ElementRef;
  @ViewChild('content1') content1 : ElementRef;
  constructor( private _Router : Router,private modalService: NgbModal) { }

  ngAfterViewInit() {debugger;
if(Boolean(sessionStorage.getItem('Paid'))==true)
{
this.success();

}
else{

this.Error();

}

  }


  clear(){
    sessionStorage.removeItem('Paid');
    this._Router.navigate(['ViewPayments']);
    
  }
  
success(){
  this.modalService.open(this.content,{ centered: true });
}

Error(){debugger;

  this.modalService.open(this.content1,{ centered: true });


}


}
