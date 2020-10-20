import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, from } from 'rxjs';  
import {Inspection} from "src/app/models/inspection";
import { OnlineLink } from '../Global';

@Injectable({
  providedIn: 'root'
})

export class InspectionService {
  url = OnlineLink; 
  constructor(private http: HttpClient) { }  
  getAllInspection(): Observable<Inspection[]> {  
    return this.http.get<Inspection[]>(this.url + 'Api/MoveIn/AllInspectionDetails/');  
  }  
  getInspectionById(inspectionid: string) {  debugger;
    return this.http.get(this.url + 'Api/Admin/AllSchedulebyId/' + inspectionid);  
  }  

  createProperty(inspection: Inspection): Observable<Inspection> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Inspection>(this.url + 'Api/MoveIn/InsertInspectionsDetails/',  
    inspection, httpOptions);  
  }  
  updateInspection(inspection: Inspection): Observable<Inspection> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Inspection>(this.url + 'Api/MoveIn/UpdateInspectionDetails/', 
    inspection, httpOptions);  
  }  
  deleteInspectionById(inspectionid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'Api/MoveIn/DeleteInspectcionDetails?id=' +inspectionid,  
 httpOptions);  
  }

  
}
