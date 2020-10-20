import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usertype } from 'src/app/usertype';


import { Users } from 'src/app/models/users';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Times } from '../Times';
import { OnlineLink } from '../Global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": '*'
  })
};


@Injectable({ providedIn: 'root' })
export class APIService {
  Apiurl = OnlineLink+'api/';  

  constructor(private httpclient: HttpClient,private router: Router) { }  
  

    UserAuthentication(user: string,pass: string):Observable<any>{    
      let credentials='username=' +user  + '&password=' +pass +'&grant_type=password';     
      var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });    
     return this.httpclient.post<any>(this.Apiurl+'token',encodeURI(credentials),{headers:reqHeader});    
   }    

   public LoginClient(user : Users) {
    return this.httpclient.post<Users>(this.Apiurl+'Employee/EmployeeLogin',user, httpOptions);
  }

  public logout(){sessionStorage.clear();}


  logged(){
    if (sessionStorage.getItem('EmployeeID') == null) {
      this.router.navigate(['']);
    }
    
  }
  getAllEmployeeType() {  
    return this.httpclient.get(this.Apiurl + 'AddUserType/GetAddUserTypes');  
  }  


getEmployeeTypeById(EmployeeTypeID: string): Observable<Usertype> {  
  return this.httpclient.get<Usertype>(this.Apiurl + 'AddUserType/GetGetAddUserTypeDetailsById/{UserTypeID/' + EmployeeTypeID);  
}  


createEmployeeType(EmployeeType: Usertype): Observable<Usertype> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.httpclient.post<Usertype>(this.Apiurl + 'AddUserType/InsertAddUserTypeDetails/',  
  EmployeeType, httpOptions);  
}  


updateEmployeeType(EmployeeType: Usertype): Observable<Usertype> {  
  debugger;
                   
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.httpclient.put<Usertype>(this.Apiurl + 'AddUserType/UpdateAddUserTypeDetails/',  
  EmployeeType, httpOptions);  
}  



deleteEmployeeTypeById(EmployeeTypeID: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.httpclient.delete<number>(this.Apiurl + 'AddUserType/DeleteUserTypeDetails?id=' +EmployeeTypeID,  
httpOptions);  
}  
public SetLogoutTime(time : Times){
  return this.httpclient.put(this.Apiurl+'api/LogoutTime/ChangeLogoutTime', time, httpOptions)
}

public GetLogOutTime() { 
  return this.httpclient.get(this.Apiurl + 'LogoutTime/GetLogoutTime')

}



  }   
