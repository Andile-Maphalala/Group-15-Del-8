import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import{Property} from 'src/app/models/property';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  url = 'http://localhost:30135/api/Property';  
  constructor(private http: HttpClient) { }  
  getAllProperty(): Observable<Property[]> {  
    return this.http.get<Property[]>(this.url + '/AllPropertyDetails');  
  }  
  getPropertyById(propertyId: string): Observable<Property> {  
    return this.http.get<Property>(this.url + '/GetPropertyDetailsById/' + propertyId);  
  }  
  createProperty(property: Property): Observable<Property> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Property>(this.url + '/InsertPropertyDetails/',  
    property, httpOptions);  
  }  
  updateProperty(property: Property): Observable<Property> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Property>(this.url + '/UpdatePropertyDetails/',  
    property, httpOptions);  
  }  
  deletePropertyById(propertyid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeletePropertyDetails?id=' +propertyid,  
 httpOptions);  
  }

  
}

