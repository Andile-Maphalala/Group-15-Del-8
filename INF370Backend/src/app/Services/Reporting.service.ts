import { Injectable } from "@angular/core"
import {HttpClient, HttpParams} from '@angular/common/http';
import{fromEvent, Observable} from 'rxjs'
import{map,filter,debounceTime, distinctUntilChanged,switchMap} from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';
import { Reporting } from '../reporting';
import { OnlineLink } from '../Global';

@Injectable({
    providedIn: 'root'
})

export class ReportingService{
    constructor(private _http : HttpClient){}

    url : string = OnlineLink;
    GetMostViewedData(date: Reporting): Observable<Reporting>{debugger;
         const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.post<Reporting>( this.url + "api/Report/MostRentedReport",date ,httpOptions )
      
    }
 
    GetOverdueData()
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.get( this.url + "api/Report/OverduePayment",httpOptions )
        .pipe(map(result => result));
    } 
}