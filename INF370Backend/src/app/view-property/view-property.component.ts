import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../api.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
// import { MyServiceService } from '../my-service.service';
import { DatePipe } from '@angular/common';
import { MyServiceService } from '../my-service.service';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  allProperty:any;  
  hasApplied: boolean;
  names: string;
  isLoggedIn: boolean;
  dates: string;
  constructor(private route:Router,private formbuilderUpdate:FormBuilder,private ApiService:ApiService,private bookingService:BookingService,private applicationService:MyServiceService) { }

  ngOnInit(): void {
    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.dates =pipe.transform(today,'yyyy-MM-dd');debugger;
    this.hasApplied=Boolean(JSON.parse(sessionStorage.getItem('hasApplied')));

this.loadPropertyDetails();

  }

  


  loadPropertyDetails(){

    this.ApiService.getPropertyByReference1(sessionStorage.getItem('PropertyID')).toPromise().then(data => {
      debugger;
      console.log(data);
      this.allProperty = data;  debugger;});
  }

  logout(){

    sessionStorage.clear();
    this.ngOnInit()
  }
  viewProperty(PropertyID:any)
  {  debugger;
    sessionStorage.setItem('PropertyID',PropertyID);
    this.route.navigateByUrl('/PropertyDetails');

  } 

  loadProperty(value:number){ debugger;
 
    sessionStorage.setItem('PropertyID',value.toString());
    this.route.navigate(['update-property']);


  }
  
}
