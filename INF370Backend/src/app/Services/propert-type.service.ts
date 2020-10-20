import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, from } from 'rxjs';  
import { PropertType } from '../models/propert-type';
import { OnlineLink } from '../Global';

@Injectable({
  providedIn: 'root'
})

export class PropertTypeService {
  url = OnlineLink; 
  constructor(private http: HttpClient) { }  
  getAllPropertType(): Observable<PropertType[]> {  
    return this.http.get<PropertType[]>(this.url + 'Api/PropertyType/GetPropertyTypes');  
  }  
  getPropertTypeById(propertyId: string): Observable<PropertType> {  
    return this.http.get<PropertType>(this.url + 'Api/PropertyType/GetPropertyTypeDetailsById/' + propertyId);  
  }  
  createProperty(propertytype: PropertType): Observable<PropertType> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<PropertType>(this.url + 'Api/PropertyType/InsertPropertyTypeDetails/',  
    propertytype, httpOptions);  
  }  
  updatePropertType(propertytype: PropertType): Observable<PropertType> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<PropertType>(this.url + 'Api/PropertyType/UpdatePropertyTypeDetails/', 
    propertytype, httpOptions);  
  }  
  deletePropertTypeById(propertyid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'Api/PropertyType/DeletePropertyTypeDetails?id=' +propertyid,  
 httpOptions);  
  }

  
}
