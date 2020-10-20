import { Injectable } from "@angular/core"
import {HttpClient, HttpParams} from '@angular/common/http';
import{fromEvent} from 'rxjs'
import{map,filter,debounceTime, distinctUntilChanged,switchMap} from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';
import { OnlineLink } from '../Global';

@Injectable({
    providedIn: 'root'
})

export class Dashboard{
    constructor(private _http : HttpClient){}

    url : string = OnlineLink;

    GetIncome()
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.get( this.url + "api/Dashboard/GetIncome",httpOptions )
        .pipe(map(result => result));
    }

    GetExpense()
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.get( this.url + "api/Dashboard/GetExpense",httpOptions );
    } 

    GetProperty()
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.get( this.url + "api/Dashboard/GetProperty",httpOptions )
        .pipe(map(result => result));
    } 


    GetJobs(){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.get( this.url + "api/Dashboard/GetJobs",httpOptions )
       
    } 
}