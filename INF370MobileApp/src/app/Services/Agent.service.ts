import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { from } from 'rxjs';
import { DisplayUser } from '../Classes/DisplayUser';
import { AddUser } from '../Classes/AddUser';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Client } from '../Classes/Client';


@Injectable({providedIn : 'root'})
export class AgentService{
url : string = "http://localhost:30135/api/User/"


  httpclient: any;
    constructor(private http : HttpClient){}

getAllUser(): Observable<DisplayUser[]> {  
    return this.http.get<DisplayUser[]>(this.url + 'GetAllUsers');  
  }  

getUser(ID: number): Observable<Client> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Client>(this.url + 'GetUserByID/' + ID,httpOptions);  
  } 

 
 
  AddUserPost(myUser : AddUser){
    this.http.post(this.url + 'AddUser',myUser
    ).subscribe(ResponseData => {
      console.log(ResponseData);[
     
      ]
    });


}

UpdateUserPost(myUser : AddUser){
  this.http.post(this.url + 'UpdateUser',myUser
  ).subscribe(ResponseData => {
    console.log(ResponseData);[
   
    ]
  });


}

}
