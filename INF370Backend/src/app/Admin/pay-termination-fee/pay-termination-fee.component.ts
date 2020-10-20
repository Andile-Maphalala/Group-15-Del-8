import { Component, OnInit } from '@angular/core';
import { PayfeeService } from 'src/app/payfee.service';
import { Hash } from 'src/classes/hash';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-pay-termination-fee',
  templateUrl: './pay-termination-fee.component.html',
  styleUrls: ['./pay-termination-fee.component.css']
})
export class PayTerminationFeeComponent implements OnInit {

  MD5string :string = '';
  dataSaved = false;  
  payable=false;
  obj:Hash= new Hash();
  totalAmount = 0;
  allRentals:any; 
  searchForm: any; 
  AmountDue:any;
  selected:any;
  constructor(private apiService:PayfeeService,private formbuilderUpdate:FormBuilder ) { }

  ngOnInit(): void {this.GetAllRentalAgreements();
    this.searchForm = this.formbuilderUpdate.group({ 
      RENTALAGREEMENTID:['', [Validators.required]], 
      DepositDueDate:['', [Validators.required]],  
      RENTALSTATUSID:['', [Validators.required]],  
      CLIENTID: ['', [Validators.required]],  
      RENTALAPPLICATIONID:['', [Validators.required]],  
      PROPERTYID:['', [Validators.required]],  
      RENTALSTARTDATE:['', [Validators.required]],  
      RENTALENDDATE:['',[Validators.required]],
      PAYMENTID:['', [Validators.required]], 
      NAME:['', [Validators.required]],  
      SURNAME:['',[Validators.required]],
      PHONENUMBER:['', [Validators.required]], 
      ADDRESS:['', [Validators.required]],  
      SearchBy: ['', [Validators.required]], 
      searchText: ['', [Validators.required]],   
    });
  
  }
  //Generate MD5 
    async genMD5()
  {
    this.MD5string = "merchant_id=10000100$merchant_key=46f0cd694581a$return_url=https%3A%2F%2Fnattrendstore.000webhostapp.com%2Fpaysuccess$cancel_url=https%3A%2F%2Fnattrendstore.000webhostapp.com%2Fpaycancel$amount="+this.totalAmount+"$item_name=NattrendOrder";
    //alert(this.MD5string);
    this.obj.hashString = this.MD5string;
    await this.apiService.getMD5(this.obj).toPromise().then( x =>{
      this.payable=true;
      this.MD5string = x.toString();
      //alert(this.MD5string);
    });
  }
  GetAllRentalAgreements(){
    this.apiService.getRentalAgreement("2").toPromise().then(data => {//ClientID
      this.allRentals = data; debugger;
      console.log(data);
      debugger;
    });
  }
  onFormSubmit() {  
    this.dataSaved = false;  
    const Employee = this.searchForm.value;  
   
    this.searchForm.reset();  
    
  }  

  GetAmount(ReferenceNo:string){debugger;
    this.apiService.getAmount(ReferenceNo).toPromise().then(data => {//ClientID
      this.AmountDue = data.toString(); debugger;
     
      this.payable=true;
      debugger;
    });
  }
  public onOptionsSelected(event) {debugger;
    const value = event.target.value;
    this.selected = value;
    console.log(value);
 }
  }

