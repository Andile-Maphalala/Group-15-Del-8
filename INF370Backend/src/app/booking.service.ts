import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';
import {  HttpParams } from '@angular/common/http';
import { AcceptRentalAgree } from './accept-rental-agree';
import { Reporting } from './reporting';
import { map } from 'rxjs/operators';
import { OnlineLink } from './Global';
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": '*'
  })
}
@Injectable({
  providedIn: 'root'
})

export class BookingService {
  ApiUrl= OnlineLink; 
  RENTALAPPLICATIONID:number=0; 
  constructor(public http: HttpClient) { }

   getAgreement(ClientID:string){ debugger;
    return this.http.get(this.ApiUrl+'Api/AcceptRentalAgreement/ApprovedApplication/'+ClientID); 
  }
  getAgreements(RentalApplicationID:string){ debugger;
    return this.http.get(this.ApiUrl+'Api/AcceptRentalAgreement/GetRentalAgreementdetails/'+RentalApplicationID); 
  }
  addRentalAgreement(acceptRentalAgree: AcceptRentalAgree): Observable<AcceptRentalAgree> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<AcceptRentalAgree>(this.ApiUrl+'Api/AcceptRentalAgreement/AddRentalAgreement/',  
    acceptRentalAgree, httpOptions);  
  } 
  
  addBooking(Booking: Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Booking>(this.ApiUrl+'Api/AddBooking/AddBooking/',  
    Booking, httpOptions);  
  }  
  UpdateBooking(Booking: Booking): Observable<Booking> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Booking>(this.ApiUrl+'Api/AddBooking/UpdateBooking/',  
    Booking, httpOptions);  
  }  
  getDateData(date: Reporting): Observable<Reporting> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Reporting>(OnlineLink + 'Api/MonthlyIncomeReport/getData/',  
    date, httpOptions);  
  }  




  

getReportData(date:Reporting):Observable<Reporting>{    
  return this.http.get<Reporting>(OnlineLink +'Api/MonthlyIncomeReport/getData/'+date).pipe(map(result=>result))
  ;    
}  

getDateData1(date: Reporting): Observable<Reporting> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Reporting>(OnlineLink + 'Api/MonthlyInvoiceReport/getData/',  
  date, httpOptions);  
}  






getReportData1(date:Reporting):Observable<Reporting>{    
return this.http.get<Reporting>(OnlineLink + 'Api/MonthlyInvoiceReport/getData/'+date).pipe(map(result=>result))
;    
}

}
