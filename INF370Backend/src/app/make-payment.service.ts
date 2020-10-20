import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terminate } from '../app/terminate';
import { OnlineLink } from './Global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MakePaymentService {
  apiURL=OnlineLink
  constructor(private http : HttpClient) { }
  //get MD5 string for PayFast
  public getMD5(obj:any){
    return this.http.post(this.apiURL+'api/MakePayment/getMD5Hash',obj,httpOptions);
  }

  getRentalAgreement(ClientID:string){ debugger;
    return this.http.get(this.apiURL+'api/MakePayment/GetProperties/'+ClientID);
  }
  getAmount(ReferenceNo:string){debugger;
    return this.http.get(this.apiURL+'api/MakePayment/GetAmountDue/'+ReferenceNo);
  }
  getRentalAgreement1(ClientID:string){ debugger;
    return this.http.get(this.apiURL+'api/RequestMaintenance/GetProperties/'+ClientID);
  }
  getAmount1(ReferenceNo:string){debugger;
    return this.http.get(this.apiURL+'api/RequestMaintenance/GetAmountDue/'+ReferenceNo);
  }
  sendMaintenance(Terminate: Terminate): Observable<Terminate> {   debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Terminate>(OnlineLink +'api/RequestMaintenance/SendEmail',  
    Terminate, httpOptions);  
  }  


}