
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Times } from './Times';
import { OnlineLink } from './Global';
 
//import {Agreements } from '../Classes/RentalAgreement';

@Injectable({
  providedIn: 'root'
})
export class AutologoutService {
  URL = OnlineLink;  
  constructor(public http: HttpClient) { }  
  
  public SetLogoutTime(times : Times){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put(this.URL+'api/LogoutTime/ChangeLogoutTime', times, httpOptions)
  }

  // public GetLogOutTime(): Observable<[Time]> {debugger;
  //   return this.http.get<[Time]>(this.URL +'api/LogoutTime/GetLogoutTimes')
  // }

  // GetLogOutTime(): Observable<[]> {  
  //   return this.http.get<[]>(this.URL + 'api/LogoutTime/GetLogoutTimes');  
  // }  
  getLogOutTime(): Observable<[]> {  
    return this.http.get<[]>(this.URL + 'api/LogoutTime/GetLogoutTimes');  
  } 
  
}
