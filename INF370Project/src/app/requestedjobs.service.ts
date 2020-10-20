import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Job } from 'src/classes/Jobs';  
import { OnlineLink } from './Global';


@Injectable({
  providedIn: 'root'
})
export class RequestedjobsService {
  url = OnlineLink;  
  constructor(private http: HttpClient) { }  

  GetReqJobs(ID:number): Observable<[]> {  debugger;
    return this.http.get<[]>(this.url + 'api/Requested/GetRequestedJobs/'+ID);  
  } 
}
