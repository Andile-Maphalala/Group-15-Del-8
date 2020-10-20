
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from 'src/classes/Employee';  
import { Check } from 'src/app/Classes/Check';
import * as myGlobal  from 'src/app/Global';
@Injectable({  
  providedIn: 'root'  
})  
  
export class EmployeeService {  
  // url = 'http://localhost:30135/';  

  url = myGlobal.OnlineLink;
  constructor(private http: HttpClient) { }  
  getAllEmployee(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Employee/GetAllEmployees');  
  }  
  getEmployeeById(employeeId: string): Observable<Employee> {  debugger;
    return this.http.get<Employee>(this.url + 'api/Employee/GetEmployeeDetailsById/' + employeeId);  
  }  


  createEmployee(employees: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(this.url + 'api/Employee/InsertEmployeeDetails/',  
    employees, httpOptions);  
  }  
  GETEmployeetype(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Employee/GetEmployeeType');  
  }  
  GetUserType(): Observable<[]> {  
    return this.http.get<[]>(this.url + 'api/Employee/GetUserType');  
  }  
 
  updateEmployee(employee: Employee): Observable<Employee> {  debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + 'api/Employee/UpdateEmployeeDetails/',  
    employee, httpOptions);  
  }  
  deleteEmployeeById(employeeId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<number>(this.url + 'api/Employee/DeleteEmployeeDetails?id=' +employeeId,  
 httpOptions);  
  }  
  ReactivateEmployeeById(employeeId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<number>(this.url + 'api/Employee/ReEmployeeDetails?id=' +employeeId,  
 httpOptions);  
  }  
//   UserAuthentication(Username: string,Password: string):Observable<any>{    
//     let credentials='username=' +Username  + '&password=' +Password +'&grant_type=password';     
//     var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });    
//    return this.http.post<any>(this.url+'token',encodeURI(credentials),{headers:reqHeader});    
//  }    


Checkusername(username: string): Observable<Check> {  debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Check>(this.url + 'api/Employee/doesUserExist/' + username,httpOptions);  
  } 

  


}  
