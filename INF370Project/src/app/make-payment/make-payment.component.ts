import { Component, OnInit } from '@angular/core';
import { MakePaymentService } from '../make-payment.service';

import { Hash } from 'src/classes/hash';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  MD5string :string = '';
  payable=false;
  obj:Hash= new Hash();
  totalAmount = 0;
  allRentals:any; 
  searchForm: any; 
  AmountDue:any;
  selected:any;
  hasApplied: boolean;
  names: string;
  emails: string;
  Status: any;
  DepositDueDate: any;
  constructor(private httpService: HttpClient,private apiService:MakePaymentService,private formbuilderUpdate:FormBuilder ) { }

  ngOnInit(): void {
    this.emails=sessionStorage.getItem('clientEmail') ;

    this.names=sessionStorage.getItem('clientName') +" "+ sessionStorage.getItem('clientSurname');
    this.hasApplied=Boolean(JSON.parse(sessionStorage.getItem('hasApplied')));


    this.GetAllRentalAgreements();
    this.searchForm = this.formbuilderUpdate.group({  
  
  
      SearchBy: ['', [Validators.required]], 
      searchText: ['', [Validators.required]],   
    });
  
  }
  //Generate MD5 
    async genMD5()
  {
    https://inturbidus.azurewebsites.net/
    this.MD5string = "merchant_id=16502529$merchant_key=1arycyqidt4hp$return_url=https%3A%2F%2Finturbidus.azurewebsites.net%2Fnotify$cancel_url=https%3A%2F%2Finturbidus.azurewebsites.net%2Fcancel$amount="+this.totalAmount+"$item_name=NattrendOrder";
    //alert(this.MD5string);
    this.obj.hashString = this.MD5string;
    await this.apiService.getMD5(this.obj).toPromise().then( x =>{
      this.payable=true;
      this.MD5string = x.toString();
      //alert(this.MD5string);
    });
  }
  GetAllRentalAgreements(){
    this.apiService.getRentalAgreement(sessionStorage.getItem('clientID')).toPromise().then(data => {//ClientID
      this.allRentals = data; debugger;
      console.log(data);
      
    });
  }

setID(value,amount,status)
{
  window.sessionStorage.setItem("ReferenceNO.",value);
  window.sessionStorage.setItem("AmountDue",amount);
  window.sessionStorage.setItem("Type",status);

  // if(Rental._checked==true)
  // window.sessionStorage.setItem("Type","2");
  // else{
  //   window.sessionStorage.setItem("Type","1");



  // }
}








  GetAmount(ReferenceNo:string){
    this.apiService.getAmount(ReferenceNo).toPromise().then(data => {//ClientID
      this.AmountDue = data["AMOUNTDUE"];
      this.Status = data["RENTALSTATUSID"];
      this.DepositDueDate=data["DepositDueDate"];



      console.log(data);
      this.payable=true;
    
    });
  }
  public onOptionsSelected(event) { 
    const value = event.target.value;
    this.selected = value;
    console.log(value);
 }
  }

