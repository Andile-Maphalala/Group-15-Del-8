import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
@Injectable({
  providedIn: 'root'
})
export class ViewAppService {
  url = 'http://localhost:30135/';  
  constructor(private http: HttpClient) { }  

  getapps(ID:number): Observable<[]> {  debugger;
    return this.http.get<[]>(this.url + 'api/RequestedApplication/GetRequestedApplication/'+ID);  
  } 
}

