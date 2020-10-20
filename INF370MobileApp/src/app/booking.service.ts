import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';
import {  HttpParams } from '@angular/common/http';
import { AcceptRentalAgree } from './accept-rental-agree';
import { Reporting } from './reporting';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": '*'
  })
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  ApiUrl='http://localhost:30135/'; 
  RENTALAPPLICATIONID:number=0; 
  PropertyID:number=0;
  PreviousEMPLOYEEDATETIMESLOTID:number=0;
  constructor(public http: HttpClient) { }
  // public addBooking(prod : Booking) {
  //   const endpoint = this.ApiUrl+'/AddBooking';
  //   const formData: FormData = new FormData();
  //   formData.append('EmployeeDateSlotID', prod.EMPLOYEEDATETIMESLOTID);
  //   formData.append('ClientID', prod.CLIENTID)

    
  //  return this.http.post(endpoint, formData, httpOptions);
  // }
  addBooking(Booking: Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Booking>('http://localhost:30135/Api/AddBooking/AddBooking',  
    Booking, httpOptions);  
  }  

  // addBooking(Booking: Booking): Observable<Booking> {  
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  //   return this.http.post<Booking>(this.ApiUrl+'Api/AddBooking/AddBooking/',  
  //   Booking, httpOptions);  
  // }  


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
  
  Reject(ID:number){ debugger;
    return this.http.get(this.ApiUrl+'Api/AcceptRentalAgreement/Reject/'+ID); 
  }
  // getAgreement(ClientID:string){ debugger;
  //   return this.http.get(this.ApiUrl+'Api/AcceptRentalAgreement/ApprovedApplication/'+ClientID); 
  // }
  // getAgreements(RentalApplicationID:string){ debugger;
  //   return this.http.get(this.ApiUrl+'Api/AcceptRentalAgreement/GetRentalAgreementdetails/'+RentalApplicationID); 
  // }
  // addRentalAgreement(acceptRentalAgree: AcceptRentalAgree): Observable<AcceptRentalAgree> {  
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  //   return this.http.post<AcceptRentalAgree>(this.ApiUrl+'Api/AcceptRentalAgreement/AddRentalAgreement/',  
  //   acceptRentalAgree, httpOptions);  
  // } 
  
  
  DeleteBooking(Booking: Booking): Observable<Booking> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Booking>(this.ApiUrl+'Api/AddBooking/DeleteBooking/',  
    Booking, httpOptions);  
  }  

  updateBooking(Booking: Booking): Observable<Booking>{

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Booking>(this.ApiUrl+'Api/AddBooking/UpdateBooking/',  
    Booking, httpOptions);  
  }


  getDateData(date: Reporting): Observable<Reporting> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Reporting>('http://localhost:30135/Api/MonthlyIncomeReport/getData/',  
    date, httpOptions);  
  }  




  

getReportData(date:Reporting):Observable<Reporting>{    
  return this.http.get<Reporting>('http://localhost:30135/Api/MonthlyIncomeReport/getData/'+date).pipe(map(result=>result))
  ;    
}  


}