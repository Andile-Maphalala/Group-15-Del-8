import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { OnlineLink } from '../Global';

@Component({
  selector: 'app-schedule-inspection',
  templateUrl: './schedule-inspection.component.html',
  styleUrls: ['./schedule-inspection.component.css']
})
export class ScheduleInspectionComponent implements OnInit {
  Schedule: any;
  searchedKeyword:string;
  dateForm: any;
  constructor(private _Router : Router ,private httpService: HttpClient,private formbulider: FormBuilder,private adminService:AdminService) { }

  ngOnInit(): void {  

this.loadSchedule();


  }


loadSchedule(){

  this.httpService.get(OnlineLink+'Api/Admin/AllSchedule').subscribe(  
    data => {
this.Schedule=data;


    })


}

loadToEdit(value){
  sessionStorage.setItem('InspectionID',value);

  this._Router.navigate(['NewInspection']);
debugger;

}



 // AllSchedule
}
