import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  url = 'http://localhost:30135/Api/Apply';
  PropertyID:number=0;  
  constructor(private http: HttpClient) { }  
  getAllApplication(): Observable<Application[]> {  
    return this.http.get<Application[]>(this.url + '/AllApplicationDetails');  
  }  
  getApplicationById(applicationId: string): Observable<Application> {  
    return this.http.get<Application>(this.url + '/GetApplicationDetailsById/' + applicationId);  
  }  
  createApplication(application: Application): Observable<Application> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Application>(this.url + '/InsertApplicationDetails/',  
    application, httpOptions);  
  } 
  
updateApplication(application: Application): Observable<Application> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put<Application>(this.url + '/UpdateApplicationDetails/',  
  application, httpOptions);  
}  
deleteApplicationById(applicationid: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + '/DeleteApplicationDetails?id=' +applicationid,  
httpOptions);  
}
public downloadFile(docFile: string): Observable < Blob > {  
  return this.http.get(this.url + '/GetFile?docFile=' + docFile, {  
      responseType: 'blob'  
  });  
}  
public downloadImage(image: string): Observable < Blob > {  
  return this.http.get(this.url + '/GetImage?image=' + image, {  
      responseType: 'blob'  
  });  
}  
public getFiles(): Observable < any[] > {  
  return this.http.get < any[] > (this.url + '/GetFileDetails');  
}  
AddFileDetails(data: FormData): Observable < string > {  
  let headers = new HttpHeaders();  
  headers.append('Content-Type', 'application/json');  
  const httpOptions = {  
      headers: headers  
  };  
  return this.http.post < string > (this.url + '/UploadDocuments/', data, httpOptions);  
}  
}  

