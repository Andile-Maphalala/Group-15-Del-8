
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Job } from 'src/app/classes/Jobs';  
import {Item} from 'src/app/item';
import {Purchase} from 'src/app/classes/Purchase';
import {Supplier} from 'src/app/classes/Supplier';
import {PurchaseLine} from 'src/app/classes/PurchaseLine';
import {Slot} from 'src/app/classes/Slot';
import {Date} from 'src/app/classes/Date';
import { DateTimeSlot } from 'src/app/Classes/DateTime';
import {JobTask} from 'src/app/classes/JobTask'; 
import * as myGlobal  from '../Global';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  url = myGlobal.OnlineLink;  
  constructor(private http: HttpClient) { }  
  GetAssignedJobs(ID:number): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Maintenance/GetAssignedJobs/'+ID);  
  }  
  getJobById(jobID: string): Observable<Job> {  
    return this.http.get<Job>(this.url + 'api/Maintenance/GetJobDetailsById/' + jobID);  
  }  
  createJob(employee: Job): Observable<Job> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Job>(this.url + 'api/Maintenance/InsertJobDetails/',  
    employee, httpOptions);  
  }  
 
  updateJob(ID) {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put(this.url + 'api/Maintenance/UpdateJobDetails/'
    +ID, httpOptions);  
  }  
  deleteJobById(employeeId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'api/Job/DeleteJobDetails?id=' +employeeId,  
 httpOptions);  
  }  
  Getitems(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Maintenance/Getitems');  
  }  
//   UserAuthentication(Username: string,Password: string):Observable<any>{    
//     let credentials='username=' +Username  + '&password=' +Password +'&grant_type=password';     
//     var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });    
//    return this.http.post<any>(this.url+'token',encodeURI(credentials),{headers:reqHeader});    
//  }    

getAllItems(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/Getitems');  
}  

getAllPurchase(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetAllPurchases');  
}  

getAllPurchaseLine(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetPurchaseLine');  
}  

getAllSupliers(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetAllSuppliers');  
}  

getSupplierById(supplierId: string): Observable<Supplier> {  
  return this.http.get<Supplier>(this.url + 'api/Maintenance/getSupplierById/' + supplierId);  
}  

getPurchaseById(purchaseID: string): Observable<Purchase> {  
  return this.http.get<Purchase>(this.url + 'api/Maintenance/getPurchaseById/' + purchaseID);  
}  
CreateItem(item: Item): Observable<Item> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Item>(this.url + 'api/Maintenance/InsertItemsDetails/',  
  item, httpOptions);  
}  

CreatePurchase(purchase: Purchase): Observable<Purchase> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Purchase>(this.url + 'api/Maintenance/InsertPurchaseDetails/',  
  purchase, httpOptions);  
}  

Createpurchaseline(purchaseline: PurchaseLine): Observable<PurchaseLine> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<PurchaseLine>(this.url + 'api/Maintenance/InsertPurchaseItemDetails/',  
  purchaseline, httpOptions);  
}  

CreateSupplier(supplier: Supplier): Observable<Supplier> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Supplier>(this.url + 'api/Maintenance/InsertSupplierDetails/',  
  supplier, httpOptions);  
}  


getAllDates(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetDate');  
} 
getAllSlots(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetSlot');  
} 

getAllDateSlots(): Observable<[]> {  
  return this.http.get<[]>(this.url + 'api/Maintenance/GetDatetimeslot');  
} 
CreateDates(date: Date): Observable<Date> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Date>(this.url + 'api/Maintenance/InsertDateDetails/',  
  date, httpOptions);  
}  

CreateSlots(slot: Slot): Observable<Slot> {   
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Slot>(this.url + 'api/Maintenance/InsertSlotDetails/',  
  slot, httpOptions);  
}  

CreateDateTimeSlots(dateslot: DateTimeSlot): Observable<DateTimeSlot> { debugger;  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<DateTimeSlot>(this.url + 'api/Maintenance/InsertDatetimeDetails/',  
  dateslot, httpOptions);  
}  

getSlotById(slotId: string): Observable<Slot> {  
  return this.http.get<Slot>(this.url + 'api/Maintenance/SlotById/' + slotId);  
}  

deleteSupplierById(supplierID: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + 'api/Maintenance/DeletesupplierDetails?id=' +supplierID,  
httpOptions);  
}  
Updatesuppliers(ID) {  debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put(this.url + 'api/Maintenance/UpdateJobDetails/'
  +ID, httpOptions);  
}  


//////////////////////////////////////////////////////
getJobTasks(JobID : number): Observable<JobTask[]> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post<JobTask[]>(this.url + 'api/Maintenance/GetJobTasks/'+JobID,httpOptions);  
}

CompleteJobTask(JobTaskID : number){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.url + 'api/Maintenance/CompleteJobTask/' + JobTaskID, httpOptions)
}

createJobtasks(jobtask: JobTask): Observable<JobTask[]> { 
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<JobTask[]>(this.url + 'api/Maintenance/InsertJobtasksDetails/',  
  jobtask, httpOptions);  
} 

createPurchaseItems(item: Item): Observable<Item[]> { 
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Item[]>(this.url + 'api/Maintenance/AddPurchasedItem/',  
  item, httpOptions);  
} 

GetDoneJobs(ID:number): Observable<Job[]> {  
  return this.http.get<Job[]>(this.url + 'api/Maintenance/GetDoneJob/'+ID);  
}


GetDatetimeslotbyId(ID : number): Observable<DateTimeSlot> {  
 // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get<any>(this.url + 'api/Maintenance/GetDatetimeslotbyId/'+ID);  
}

UpdateDatetimeslotbyId(Data : DateTimeSlot): Observable<DateTimeSlot> {  
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post<DateTimeSlot>(this.url + 'api/Maintenance/UpdateDatetimeSlotById/',Data,httpOptions);  
 }
 
 DeleteSlot(ID : number) {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.url + 'api/Maintenance/DeleteSlot/'+ID,httpOptions);  
}

// CompleteJob(ID: number) { 
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post(this.url + 'api/Maintenance/AddPurchasedItem/',  
//   ID, httpOptions);  
// } 

}  
