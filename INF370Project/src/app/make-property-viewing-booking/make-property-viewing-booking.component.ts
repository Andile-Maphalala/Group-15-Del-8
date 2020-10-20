import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Booking } from '../booking';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import * as myGlobal  from '../Global';

import { BookingService } from '../booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-make-property-viewing-booking',
  templateUrl: './make-property-viewing-booking.component.html',
  styleUrls: ['./make-property-viewing-booking.component.css'],
 
})

export class MakePropertyViewingBookingComponent implements OnInit {
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;

  allBookings:any;
  booking = new Booking();
  noBoookings: boolean;
  searching: boolean;
  constructor(private modalService: NgbModal,private httpService: HttpClient,private bookingService:BookingService) { }  
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  ngOnInit() {  
    this.loadSlots()
  }  
  OnSubmit(EMPLOYEEDATETIMESLOTID:number){ debugger;
    this.searching=true;
    this.booking.EMPLOYEEDATETIMESLOTID=EMPLOYEEDATETIMESLOTID;
    this.booking.CLIENTID=Number(sessionStorage.getItem('clientID')); 
    this.booking.PROPERTYID=Number(sessionStorage.getItem('PropertyID')); 
    this.bookingService.addBooking(this.booking).subscribe(data=>{
debugger;
      if(Boolean(data)==false)
      {


        this.myBookingExist()
      }
      else{
        this.myBooking();

      }
     
      this.loadSlots();
      this.searching=false;

    });
  
    
  }

  myBooking(){
    this.modalService.open(this.content,{ centered: true });

  }

  
  myBookingExist(){
    this.modalService.open(this.content1,{ centered: true });

  }

  loadSlots()
  { this.httpService.get(myGlobal.OnlineLink + 'Api/GetAvailableSlots/Slots/'+sessionStorage.getItem('PropertyID')).subscribe(  
    data => { this.allBookings =data; debugger;
     this.EMPLOYEEs = data as string [];  
     this.DATEs = data as string []
   this.SLOTs = data as string []
   if(this.EMPLOYEEs.length==0){
      
    this.noBoookings=true;
   }
   else{
    this.noBoookings=false;
   }
    }  
  ); }
  
}  