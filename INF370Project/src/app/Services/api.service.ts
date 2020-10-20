import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Users } from 'src/app/models/users';
import { Observable } from 'rxjs';
import * as myGlobal  from '../Global';
import { Times } from './Times';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": '*'
  })
};


@Injectable({ providedIn: 'root' })
export class APIService {
  Apiurl = myGlobal.OnlineLink + 'api/';  

  constructor(private httpclient: HttpClient) { }  
  

    UserAuthentication(user: string,pass: string):Observable<any>{    
      let credentials='username=' +user  + '&password=' +pass +'&grant_type=password';     
      var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });    
     return this.httpclient.post<any>(this.Apiurl+'token',encodeURI(credentials),{headers:reqHeader});    
   }    

   public LoginClient(user : Users) {
    return this.httpclient.post<Users>(this.Apiurl+'Login/ClientLogin',user, httpOptions);
  }
  public logout(){sessionStorage.clear();}

  public SetLogoutTime(time : Times){
    return this.httpclient.put(this.Apiurl+'api/LogoutTime/ChangeLogoutTime', time, httpOptions)
  }

  public GetLogOutTime() { 
    return this.httpclient.get(this.Apiurl + 'LogoutTime/GetLogoutTime')

}
}
