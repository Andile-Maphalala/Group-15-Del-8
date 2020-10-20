import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { from } from 'rxjs';
import { DisplayUser } from '../Classes/DisplayUser';
import { AddUser } from '../Classes/AddUser';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import { Client } from '../Classes/Client';
import { Deactivate } from 'src/app/Classes/Deactivate';
import { Check } from 'src/app/Classes/Check';
import * as myGlobal  from '../Global';


@Injectable({providedIn : 'root'})
export class UserService{
  url : string = myGlobal.OnlineLink+ "api/User/"


  httpclient: any;
    constructor(private http : HttpClient){}

getAllUser(): Observable<DisplayUser[]> {  
    return this.http.get<DisplayUser[]>(this.url + 'GetAllUsers');  
  }  

getUser(ID: number): Observable<Client> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Client>(this.url + 'GetUserByID/' + ID,httpOptions);  
  } 

  CheckUsername(username: string): Observable<Check> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.get<Check>(this.url + 'doesUserExist/' + username,httpOptions);  
    } 
 
    public doesUserExist(usr:string){
      return this.http.get(this.url+'User/doesUserExist/'+usr);
    }
//   AddUserPost(myUser : AddUser){
//     this.http.post(this.url + 'AddUser',myUser
//     ).subscribe(ResponseData => {
//       console.log(ResponseData);
     
      
//     });



// }

AddUserPost(EmployeeType: AddUser): Observable<AddUser> {  debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<AddUser>(this.url + 'AddUser',  
  EmployeeType, httpOptions);  
}  


Deactivate(myUser : Deactivate){
  this.http.post(this.url + 'Deactivate',myUser
  ).subscribe(ResponseData => {
    console.log(ResponseData);[
   
    ]
  });


}

// UpdateUserPost(myUser : AddUser){
//   this.http.post(this.url + 'UpdateUser',myUser
//   ).subscribe(ResponseData => {
//     console.log(ResponseData);[
   
//     ]
//   });
// }


UpdateUserPost(myUser: AddUser): Observable<AddUser> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<AddUser>(this.url + 'UpdateUser',  
  myUser, httpOptions);  
  }  
  

}
