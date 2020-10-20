import { Injectable } from '@angular/core';    
import { HttpClient , HttpHeaders,HttpParams } from '@angular/common/http';    
import { Observable } from 'rxjs';    
@Injectable({    
  providedIn: 'root'    
})    
export class MyserviceService {
  [x: string]: any;    
    
  constructor(private http: HttpClient) { }    
  ApiUrl='http://localhost:2511/';    
    
  // postData(data): any {      
  //   const body = new HttpParams()          
  //   .set('grant_type', data.grant_type)          
  //   .set('username', data.username)    
  //   .set('password', data.password)    
  //   return this.http.post('http://localhost:2511/token', body.toString(), {observe: 'response',    
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
  //   });    
  // }    

}   