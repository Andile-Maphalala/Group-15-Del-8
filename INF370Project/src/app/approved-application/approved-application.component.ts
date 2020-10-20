import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-application',
  templateUrl: './approved-application.component.html',
  styleUrls: ['./approved-application.component.css']
})
export class ApprovedApplicationComponent implements OnInit {
  allApprovedRentalApplications:any;
  booking = new Booking();
  noBoookings: boolean;
  constructor(private route:Router, private httpService: HttpClient,private bookingService:BookingService) { }  
  RENTALAPPLICATIONs: string[];  
  CLIENTs: string[]; 
  PROPERTies: string[];
  SLOTs: string[];
  ngOnInit() { 
    this.GetApprovedApplications();
    // this.httpService.get('http://localhost:30135/Api/AcceptRentalAgreement/ApprovedApplication/').subscribe(  
    //   data => { this.allApprovedRentalApplications =data;
    //    this.RENTALAPPLICATIONs = data as string [];  
    //    this.CLIENTs = data as string []
    // //    this.PROPERTies = data as string []
    //   }  
    // );  
  }  
  OnSubmit(RENTALAPPLICATIONID){
    sessionStorage.setItem('RENTALAPPLICATIONID',RENTALAPPLICATIONID.toString());

    // this.bookingService.RENTALAPPLICATIONID=RENTALAPPLICATIONID;
    this.route.navigateByUrl('/AcceptRental');
  
  }
  GetApprovedApplications(){
    this.bookingService.getAgreement(sessionStorage.getItem('clientID')).toPromise().then(data => {
      this.allApprovedRentalApplications = data; 
      console.log(data);

      this.SLOTs = data as string []
      if(this.SLOTs.length==0){
         
       this.noBoookings=true;
      }
      else{
       this.noBoookings=false;
      }
     
    });
  }
  
}  