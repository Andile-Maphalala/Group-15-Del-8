import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { DisplayUser } from '../Classes/DisplayUser';
import { AddUser } from '../Classes/AddUser';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import { Complaint } from '../Classes/Complaint';
import { AndyEmployee } from '../Classes/AndyEmployee';
import { OnlineLink } from '../Global';



@Injectable({providedIn : 'root'})
export class ComplaintService{
// url : string = "http://localhost:30135/api/Complaint/"
url=OnlineLink+"api/Complaint/";

  formData : Complaint;
  httpclient: any;
    constructor(private http : HttpClient){}

getAllComplaint(): Observable<Complaint[]> {  
    return this.http.get<Complaint[]>(this.url + 'getAllComplaints');  
  }  

  getAllEmployees(): Observable<AndyEmployee[]> {  
    return this.http.get<AndyEmployee[]>(this.url + 'GetAllEmployees');  
  } 

  GetUnassignedComplaints(): Observable<Complaint[]> {  
    return this.http.get<Complaint[]>(this.url + 'GetUnassignedComplaints');  
  }  

  Assign(Emp : AndyEmployee,){
   return this.http.post(this.url + 'Assign',Emp);
  }

  
// getComplaint(ID: number): Observable<Complaint> {  
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     return this.http.post<Complaint>(this.url + 'GetComplaintById/' + ID,httpOptions);  
//   }
  
  
  deleteComplaint(ComplaintID: number): Observable<Complaint> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Complaint>(this.url + 'DeleteComplaint/' + ComplaintID, httpOptions);
  }


  
  getComplaintById(ComplaintID: number): Observable<Complaint> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Complaint>(this.url + 'GetComplaintById/' + ComplaintID,httpOptions);
  }

  

  AddComplaint(com : Complaint){
    this.http.post(this.url + 'AddComplaint',com
    ).subscribe(ResponseData => {
      console.log(ResponseData);[
     
      ]
    });


}
 
  public postFile(com : Complaint, fileToUpload: File) {
    const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const endpoint = this.url + 'AddComplaint';
    const formData: FormData = new FormData();
    formData.append('UserID', com.UserID.toString());
    formData.append('Details', com.Details)
    formData.append('RentalID', com.RentalID.toString())
    formData.append('Image', fileToUpload, fileToUpload.name);
   return this.http.post(endpoint, formData, httpOptions);
  }


  UpdateComplaint
  public UpdateFile(com : Complaint, fileToUpload: File) {
    const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const endpoint = this.url + 'UpdateComplaint';
    const formData: FormData = new FormData();
    formData.append('ComplaintID', com.ComplaintID.toString())
    formData.append('UserID', com.UserID.toString())
    formData.append('Details', com.Details)
    //formData.append('RentalID', com.RentalID.toString())
    formData.append('Image', fileToUpload, fileToUpload.name);
   return this.http.post(endpoint, formData, httpOptions);
  }

   public UpdateFileOFOldImage(com : Complaint, fileToUpload: File) {
    const httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin" :'*' }) }
    const endpoint = this.url + 'UpdateComplaint';
    const formData: FormData = new FormData();
    formData.append('ComplaintID', com.ComplaintID.toString())
    formData.append('UserID', com.UserID.toString())
    formData.append('Details', com.Details)
    //formData.append('RentalID', com.RentalID.toString())
    //formData.append('Image', fileToUpload, fileToUpload.name);
   return this.http.post(endpoint, formData, httpOptions);
  }






}
