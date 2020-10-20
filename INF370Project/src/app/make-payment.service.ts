import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Terminate } from './terminate';
import { Observable } from 'rxjs';
import * as myGlobal  from './Global';

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
   //apiURL="http://localhost:30135/";
   apiURL= myGlobal.OnlineLink;; 
 
  // apiURL="http://localhost:30135/";
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
    return this.http.get(this.apiURL+'api/Terminate/GetProperties/'+ClientID);
  }
  getAmount1(ReferenceNo:string){debugger;
    return this.http.get(this.apiURL+'api/Terminate/GetAmountDue/'+ReferenceNo);
  }
  sendTermination(Terminate: Terminate): Observable<Terminate> {   debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Terminate>(this.apiURL+'Api/Terminate/SendTerminateEmail',  
    Terminate, httpOptions);  
  }  

  //////////////////////////////////////////////////////////////////////////////////////////////
getRentalAgreement2(ClientID:string){ debugger;
  return this.http.get(this.apiURL+'api/Extend/GetProperties/'+ClientID);
}
getDate(ClientID:string){debugger;
  return this.http.get(this.apiURL+'api/Extend/GetAmountDue/'+ClientID);
}
sendExtension(Terminate: Terminate): Observable<Terminate> {   debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Terminate>(this.apiURL+'Api/Extend/SendExtendEmail',  
  Terminate, httpOptions);  
}  
//////////////////////////////////////////////////////////////////////////////////////
getRentalAgreement3(ClientID:string){ debugger;
  return this.http.get(this.apiURL+'api/RequestMaintenance/GetProperties/'+ClientID);
}
getAmount3(ReferenceNo:string){debugger;
  return this.http.get(this.apiURL+'api/RequestMaintenance/GetAmountDue/'+ReferenceNo);
}
sendMaintenance(Terminate: Terminate): Observable<Terminate> {   debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Terminate>(this.apiURL+'Api/RequestMaintenance/SendMaintenanceEmail',  
  Terminate, httpOptions);  
}  
GetAllPaymentsByID(ID : number){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
  return this.http.post(this.apiURL + 'Api/MakePayment/ViewPayments/' + ID,httpOptions) 

}


}