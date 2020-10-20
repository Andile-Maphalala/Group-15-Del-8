import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { TerminatedAgree } from './terminated-agree';

@Injectable({
  providedIn: 'root'
})
export class TerminateRService {
  url = 'http://localhost:30135/Api/Apply';  
  constructor(private http: HttpClient) {}  
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
  AddFileDetails(data: FormData): Observable < string > {  debugger;
      let headers = new HttpHeaders();  
      headers.append('Content-Type', 'application/json');  
      const httpOptions = {  
          headers: headers  
      };  
      return this.http.post < string > (this.url + '/AddFileDetails/', data, httpOptions); debugger; 
  }  
}  

  
