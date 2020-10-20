import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { Hash } from 'src/classes/hash';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

export class PayfeeService {
  apiURL=OnlineLink;
  constructor(private http : HttpClient) { }
  //get MD5 string for PayFast
  public getMD5(obj:any){
    return this.http.post(this.apiURL+'api/Admin/getMD5Hash',obj,httpOptions);
  }

  getRentalAgreement(ClientID:string){ debugger;
    return this.http.get(this.apiURL+'api/Admin/GetProperties/'+ClientID);
  }
  getAmount(ReferenceNo:string){debugger;
    return this.http.get(this.apiURL+'api/Admin/GetAmountDue/'+ReferenceNo);
  }
  updateAgreement(agree: Hash): Observable<Hash> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Hash>(this.apiURL + 'api/Maintenance/UpdateJobDetails/',  
    agree, httpOptions);  
  }  
  createPayment(hash: Hash): Observable<Hash> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Hash>(this.apiURL + 'api/Admin/InsertEmployeeDetails/',  
    hash, httpOptions);  
  }  
}
