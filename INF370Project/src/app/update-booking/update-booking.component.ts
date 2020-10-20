import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import * as myGlobal  from '../Global';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {
  allBookings: any;
  noBoookings: boolean;
  @ViewChild('content') content : any;


  constructor(private modalService: NgbModal,private httpService: HttpClient,private bookingService:BookingService) { }
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  booking = new Booking();
  ngOnInit(): void {
    this.loadSlots()
  }
  
  loadSlots()
  { this.httpService.get( myGlobal.OnlineLink+ 'Api/GetAvailableSlots/Slots').subscribe(  
    data => { this.allBookings =data;
      this.EMPLOYEEs = data as string [];  
     this.DATEs = data as string []
      this.SLOTs = data as string []
      debugger;
      if(this.EMPLOYEEs.length==0){
      
        this.noBoookings=true;
       }
       else{
        this.noBoookings=false;
       }
        


    }  
  ); }

  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }


  OnSubmit(EMPLOYEEDATETIMESLOTID){
    debugger;
    this.booking.EMPLOYEEDATETIMESLOTID=Number(sessionStorage.getItem('PreviousEMPLOYEEDATETIMESLOTID'));//to be changed to previous booking aftert testing
    this.booking.CLIENTID=Number(sessionStorage.getItem('clientID')); 
    
    this.booking.newEMPLOYEEDATETIMESLOTID=EMPLOYEEDATETIMESLOTID;


    //this.bookingService.PreviousEMPLOYEEDATETIMESLOTID; 
    this.bookingService.updateBooking(this.booking).subscribe(data=>{
this.openWindowCustomClass();
      this.loadSlots();
      
    });

    
  }
}
