import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Agent } from '../Classes/Agent';
import { AddUser } from '../Classes/AddUser';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import { Client } from '../Classes/Client';
import { Property } from 'src/app/Classes/Property';
import { OnlineLink } from '../Global';


@Injectable({providedIn : 'root'})
export class AgentService{

  url=OnlineLink+"api/Agent/";
//url : string = "http://localhost:30135/api/Agent/"


  httpclient: any;
    constructor(private http : HttpClient){}

getAllAgents(): Observable<Agent[]> {  
  //  const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) } ;
    return this.http.get<Agent[]>(this.url + 'GetAgents');  
  }  

  

getAgent(ID: number): Observable<Agent> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Agent>(this.url + 'GetAgentByID/' + ID,httpOptions);  
  } 

  deleteAgent(ID: number): Observable<Agent> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Agent>(this.url + 'DeleteAgent/' + ID, httpOptions);
  }
 
  AddAgent(myAgent : Agent){
    return this.http.post(this.url + 'AddAgent',myAgent)


}



UpdateAgent(myAgent : Agent){
  return  this.http.post(this.url + 'UpdateAgent',myAgent)


}

AssignAgent(myproperty : Property,){
  return this.http.post(this.url + 'Assign',myproperty)
}

UnAssignAgent(ID : number,){
  return this.http.post(this.url + 'UnassignAgent',ID)
}

getAllProperty(): Observable<Property[]> {  
  return this.http.get<Property[]>(this.url + 'AllPropertyDetails');  
}  

}
