import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { DisplayUser } from 'src/app/Classes/DisplayUser';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { MakePaymentService } from 'src/app/make-payment.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private paymentservice:MakePaymentService) { }
  allPayments : any
  searchedKeyword: string;
  
  loadPayments(clientID : number) {  
    this.allPayments = this.paymentservice.GetAllPaymentsByID(clientID).subscribe(data =>{
      this.allPayments = data;
      console.log(this.allPayments);

    }); 
  }



  ngOnInit(): void {
this.loadPayments(Number(window.sessionStorage.getItem('clientID')))

  }


}
