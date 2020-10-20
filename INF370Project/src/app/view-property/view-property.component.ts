import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../api.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { DatePipe } from '@angular/common';


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
  date: string;
  ID: any;
  Check: any;
  
  Checking=1 ;
  constructor(private router:Router,private formbuilderUpdate:FormBuilder,private ApiService:ApiService,private bookingService:BookingService,private applicationService:MyServiceService) { }

  ngOnInit(): void {
   // this.CheckOTP();
    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.date =pipe.transform(today,'yyyy-MM-dd');debugger;
    this.hasApplied=Boolean(JSON.parse(sessionStorage.getItem('hasApplied')));

    if(sessionStorage.getItem('loggedInStatus')=='true')
    { this.names=sessionStorage.getItem('clientName') +" "+ sessionStorage.getItem('clientSurname') ;
      this.isLoggedIn=false;

    }
    else{

      this.isLoggedIn=true;
    }

this.loadPropertyDetails();

  }

  


  loadPropertyDetails(){

    this.ApiService.getPropertyByReference1(sessionStorage.getItem('PropertyID')).toPromise().then(data => {
      debugger;
      console.log(data);
      this.allProperty = data;  debugger;});
  }

  // makeBooking(PropertyID){debugger;
  //   this.bookingService.PropertyID=PropertyID;

  //   this.router.navigate(['/booking']);

  // }
  logout(){

    sessionStorage.clear();
    this.ngOnInit()
  }

  // apply(PropertyID){
  //   this.applicationService.PropertyID=PropertyID;

  //   this.router.navigate(['/apply']);

  // }


  makeBooking(PropertyID){
debugger;
    this.ID = Number(window.sessionStorage.getItem("clientID"));

    if(this.ID!=0)
    {

      this.ApiService.checkOTP(this.ID).subscribe(data =>{
        //  this.Check = this.ApiService.checkOTP(this.otpObj); 
          this.Check = data; debugger;
          if (this.Check.length == 0)
          {
            this.Checking = 0
    
            if (this.Checking == 0)
        {
          this.router.navigate(['/verify']);
        }
       
          }
          else {
            this.bookingService.PropertyID=PropertyID;
      
            this.router.navigate(['/booking']);
          }
        });
    
        
       

    }
    else{
      this.router.navigate(['/login']);
//display message


    }


  }

  apply(PropertyID){
    this.ID = Number(window.sessionStorage.getItem("clientID"));
    if(this.ID!=0)
    {
    this.ApiService.checkOTP(this.ID).subscribe(data =>{
    //  this.Check = this.ApiService.checkOTP(this.otpObj); 
      this.Check = data; debugger;
      if (this.Check.length == 0)
      {
        this.Checking = 0

        if (this.Checking == 0)
    {
      this.router.navigate(['/verify']);
    }
  
      }
      else {
        this.bookingService.PropertyID=PropertyID;
  
        this.router.navigate(['/apply']);
      }

    });

  }else{
    this.router.navigate(['/login']);




  }
  }
}