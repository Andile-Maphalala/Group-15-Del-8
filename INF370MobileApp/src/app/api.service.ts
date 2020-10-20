import { Injectable } from '@angular/core';
//import { City } from 'src/classes/city';
//import { Area } from 'src/classes/area';
//import { Province } from 'src/classes/province';
//import { EmployeeType } from 'src/classes/employee-type';
//import * as myGlobal  from './Global';

import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { BrowseProperty } from './browse-property';
import { SearchPropety } from './search-propety';
import { VerifyOTP } from './verify-otp';
import { Newpass } from './newpass';
import { Otp } from './otp';
//import { Payment } from './payment';

const httpOptions ={
  headers:new HttpHeaders({"Access-Control-Allow-Origin":'*'})

}
 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //ApiUrl= myGlobal.OnlineLink;
myError:any;
  // ApiUrl='http://localhost:30135/';  
  PropertyID:number=0;
  hasApplied:boolean;
  constructor(private http: HttpClient) { }

//   getAllEmployeeType(): Observable<EmployeeType[]> {  
//     return this.http.get<EmployeeType[]>(this.ApiUrl + 'api/Employee/GetEmployeeTypes');  
//   }  


// getEmployeeTypeById(EmployeeTypeID: string): Observable<EmployeeType> {  
//   return this.http.get<EmployeeType>(this.ApiUrl + 'api/Employee/GetEmployeeTypeDetailsById/' + EmployeeTypeID);  
// }  


// createEmployeeType(EmployeeType: EmployeeType): Observable<EmployeeType> {  
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post<EmployeeType>(this.ApiUrl + 'api/Employee/InsertEmployeeTypeDetails/',  
//   EmployeeType, httpOptions);  
// }  


// updateEmployeeType(EmployeeType: EmployeeType): Observable<EmployeeType> {  
//   debugger;
                   
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.put<EmployeeType>(this.ApiUrl + 'api/Employee/UpdateEmployeeTypeDetails/',  
//   EmployeeType, httpOptions);  
// }  



// deleteEmployeeTypeById(EmployeeTypeID: string): Observable<number> {  
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.delete<number>(this.ApiUrl + 'api/Employee/DeleteEmployeeTypeDetails?id=' +EmployeeTypeID,  
// httpOptions);  
// }  

// //City||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// getAllCity(): Observable<City[]> {  
//   return this.http.get<City[]>(this.ApiUrl + 'api/Location/GetCities');  
// }  


// getCityById(CityID: string): Observable<City> {  
// return this.http.get<City>(this.ApiUrl + 'api/Location/GetCityDetailsById/' + CityID);  
// }  




// createCity(City: City): Observable<City> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.post<City>(this.ApiUrl + 'api/Location/InsertCityDetails/',  
// City, httpOptions);  
// }  


// updateCity(City: City): Observable<City> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.put<City>(this.ApiUrl + 'api/Location/UpdateCityDetails/',  
// City, httpOptions);  
// }  



// deleteCityById(CityID: string): Observable<number> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteCityDetails?id=' +CityID,  
// httpOptions);  
// }  

// //Area||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// getAllArea(): Observable<Area[]> {  
//   return this.http.get<Area[]>(this.ApiUrl + 'api/Location/GetAreas');  
// }  


// getAreaById(AreaID: string): Observable<Area> {  
// return this.http.get<Area>(this.ApiUrl + 'api/Location/GetAreaDetailsById/' + AreaID);  
// }  


// createArea(Area: Area): Observable<Area> {  
//   debugger;
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.post<Area>(this.ApiUrl + 'api/Location/InsertAreaDetails/',  
// Area, httpOptions);  
// }  


// updateArea(Area: Area): Observable<Area> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.put<Area>(this.ApiUrl + 'api/Location/UpdateAreaDetails/',  
// Area, httpOptions);  
// }  



// deleteAreaById(AreaID: string): Observable<number> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteAreaDetails?id=' +AreaID,  
// httpOptions);  
// }  


// // //Province||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// getAllProvince(): Observable<Province[]> {  
//   return this.http.get<Province[]>(this.ApiUrl + 'api/Location/GetProvinces');  
// }  


// getProvinceById(ProvinceID: string): Observable<Province> {  
// return this.http.get<Province>(this.ApiUrl + 'api/Location/GetProvinceDetailsById/' + ProvinceID);  
// }  


// createProvince(Province: Province): Observable<Province> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.post<Province>(this.ApiUrl + 'api/Location/InsertProvinceDetails/',  
// Province, httpOptions);  
// }  


// updateProvince(Province: Province): Observable<Province> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.put<Province>(this.ApiUrl + 'api/Location/UpdateProvinceDetails/',  
// Province, httpOptions);  
// }  



// deleteProvinceById(ProvinceID: string): Observable<number> {  
// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
// return this.http.delete<number>(this.ApiUrl + 'api/Location/DeleteProvinceDetails?id=' +ProvinceID,  
// httpOptions);  
// }  


//Browse property page|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// getPropertyByProvince(Province : string){

//   return this.http.get(this.ApiUrl+'api/Rental/getPropertyByProvince/'+Province);

// }

// getPropertyByProvince(browse: SearchPropety): Observable<SearchPropety> {  debugger;
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post<SearchPropety>(this.ApiUrl +'Api/Test/getPropertyByProvince',  
//   browse, httpOptions);  
  
// }  


// getPropertyByArea(Area : string){

//   return this.http.get(this.ApiUrl+'api/Rental/getPropertyByArea/'+Area);

// }
// getPropertyByArea(browse: SearchPropety): Observable<SearchPropety> {  debugger;
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post<SearchPropety>(this.ApiUrl + 'Api/Test/getPropertyByArea',  
//   browse, httpOptions);  
  
// }  


// getPropertyByReference(Reference : string){

//   return this.http.get(this.ApiUrl+'api/Rental/getPropertyByReference/'+Reference);

// }

// getPropertyByReference1(Reference : string){

//   return this.http.get(this.ApiUrl+'api/Rental/getPropertyByReference1/'+Reference);

// }

// AddPayment(Pay: Payment): Observable<Payment> {  debugger;
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post<Payment>(this.ApiUrl + 'Api/MakePayment/AddPayment',  
//   Pay, httpOptions);  
// }  

// getPropertyByCity(City : string){

//   return this.http.get(this.ApiUrl+'api/Rental/getPropertyByCity/'+City);

// }

// getPropertyByCity(browse: SearchPropety): Observable<SearchPropety> {  debugger;
//   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//   return this.http.post<SearchPropety>(this.ApiUrl + 'Api/Test/getPropertyByCity',  
//   browse, httpOptions);  
  
// }  
  
//   //resend OTP via email
//   public resendOTP(resendInfo:Otp) {
//     return this.http.post(this.ApiUrl+'api/Login/ResendOTP',resendInfo, httpOptions);
//   }

//   //request password reset
//   public requestPasswordReset(usrn:string) {
//     return this.http.post(this.ApiUrl+'api/Login/RequestPasswordReset/'+usrn,usrn, httpOptions);
//   }

//   //check enterer OTP for password reset
//   public verifyResetOTP(dataX:VerifyOTP) {
//     return this.http.post(this.ApiUrl+'api/Login/VerifyResetOTP',dataX, httpOptions);
//   }

//   //set new pass
//   public setNewPass(pss:Newpass) {
//     return this.http.post(this.ApiUrl+'api/Login/SetNewPass',pss, httpOptions);
//   }

//   //verify account with OTP
//   public verifyWithOTP(otpObj:Otp) {
//     return this.http.post(this.ApiUrl+'api/Login/VerifyWithOTP',otpObj, httpOptions);
//   }


//   AddCount(PropertyID:number)
//   {
//     return this.http.get(this.ApiUrl + 'api/Property/AddCount/' + PropertyID);  

//   }




}












