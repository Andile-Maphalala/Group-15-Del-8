import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import{Property} from 'src/app/models/property';
import { PropertType } from '../models/propert-type';
import { OnlineLink } from '../Global';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  url = OnlineLink+'Api/Property';  
  PropertyID:any=0;
  constructor(private http: HttpClient) { }  
  getAllProperty(): Observable<Property[]> {  
    return this.http.get<Property[]>(this.url + '/AllPropertyDetails');  
  }  
  getPropertyById(propertyId: string): Observable<Property> {   debugger;
    return this.http.get<Property>(this.url + '/PropertyDetails/' + propertyId);  
  }  
  createProperty(property: Property): Observable<Property> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    console.log("It reaches the service file") ; debugger;
    return this.http.post<Property>(this.url + '/AddProperty/',property, httpOptions);  
  }  

  
//   createProperty(property: Property): Observable<Property> {  
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   debugger;
//   return this.http.post<Property>(this.url + '/AddProperty/',  
//   property, httpOptions);  
// }  

  updateProperty(property: Property): Observable<Property> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Property>(this.url + '/UpdatePropertyDetails/',  
    property, httpOptions);  
  }  
  deletePropertyById(propertyid: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<number>(this.url + '/ArchivePropertyDetails/' +propertyid,  
 httpOptions);  
  }

  Unarchive(propertyid: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<number>(this.url + '/UnarchivePropertyDetails/' +propertyid,  
 httpOptions);  
  }


  getAllType(): Observable<PropertType[]> {  
    return this.http.get<PropertType[]>(this.url + '/GetPropertyTypes');  
  }  

  public postFile(prop : Property, files: FileList) {
    //const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    const endpoint = this.url + '/AddProperty';
    const formData: FormData = new FormData();
    formData.append('AREA', prop.AREA);
    formData.append('PROPERTYTYPE', prop.PROPERTYTYPE);
    formData.append('PROPERTYDESCRIPTION', prop.PROPERTYDESCRIPTION);
    formData.append('ADDRESS', prop.ADDRESS)
    formData.append('SIZE', prop.SIZE.toString());
    formData.append('NUMBED', prop.NUMBED.toString());
    formData.append('NUMBBATH', prop.NUMBBATH.toString());
    formData.append('GARDEN', prop.GARDEN);
    formData.append('ADDITIONALINFO', prop.ADDITIONALINFO);
    //formData.append('PHOTO',files);
    console.log(formData);
   return this.http.post(endpoint, formData, httpOptions);
  }

  
}

