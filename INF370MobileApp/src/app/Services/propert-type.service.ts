import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, from } from 'rxjs';  
import { PropertType } from '../models/propert-type';

@Injectable({
  providedIn: 'root'
})

export class PropertTypeService {
  url = 'http://localhost:30135/'; 
  constructor(private http: HttpClient) { }  
  getAllPropertType(): Observable<PropertType[]> {  
    return this.http.get<PropertType[]>(this.url + 'Api/PropertyType/GetAllPropertyTypes/');  
  }  
  getPropertTypeById(propertyId: string): Observable<PropertType> {  
    return this.http.get<PropertType>(this.url + 'Api/PropertyType/GetPropertyTypeDetailsById/' + propertyId);  
  }  
  createProperty(propertytype: PropertType): Observable<PropertType> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<PropertType>(this.url + 'Api/PropertyType/InsertPropertyDetails/',  
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
