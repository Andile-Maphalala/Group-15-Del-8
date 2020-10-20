import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';
import { debounce } from 'rxjs/operators';
import { Router } from '@angular/router';
import { saveAs as importedSaveAs } from "file-saver";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mobiscroll, MbscEventcalendarOptions } from 'src/lib/mobiscroll/js/mobiscroll.angular.min.js';
import * as myGlobal  from '../Global';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  allBookings:any;
  booking = new Booking();
  searchedKeyword: string;
  ID: number;
  noBoookings: boolean;
  @ViewChild('content') content : any;

  events: any;
    
  eventSettings: MbscEventcalendarOptions = {
      lang: 'en',                        // Specify language like: lang: 'pl' or omit setting to use default
      theme: 'ios',                      // Specify theme like: theme: 'ios' or omit setting to use default
  themeVariant: 'light',                 // More info about themeVariant: https://docs.mobiscroll.com/4-10-7/angular/eventcalendar#opt-themeVariant
      display: 'inline',                 // Specify display mode like: display: 'bottom' or omit setting to use default
      calendarHeight: 610,               // More info about calendarHeight: https://docs.mobiscroll.com/4-10-7/angular/eventcalendar#opt-calendarHeight
      view: {                            // More info about view: https://docs.mobiscroll.com/4-10-7/angular/eventcalendar#opt-view
          calendar: {
              labels: true               // More info about labels: https://docs.mobiscroll.com/4-10-7/angular/eventcalendar#opt-labels
          }
      },
      onEventSelect: (event, inst) => {  // More info about onEventSelect: https://docs.mobiscroll.com/4-10-7/angular/eventcalendar#event-onEventSelect
        debugger;

      
        mobiscroll.toast({ 
              
              message: event.event.text,
              display:"center",
              color:"info" 
          });
      }
  };
  searching: boolean;

  constructor(private modalService: NgbModal,private _Router : Router ,private httpService: HttpClient,private bookingService:BookingService) { }  
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  ngOnInit() { 

   
    
     
    this.loadSlots();
  this.calendar();
  };
    
remove(){
debugger;
//   $("div:contains('TRIAL')").remove();
//   $("div:contains(TRIAL)").filter(function () {
//     return true;
// }).remove();
debugger;
}

Export(){
  var ID = parseInt(sessionStorage.getItem("userID"))
  debugger;
this.searching=true;
this.httpService.get(myGlobal.OnlineLink+ 'Api/AddBooking/ExportMySlotsCalendar/'+ID).subscribe( hh=>{

   

    var icsMSG = hh;

    window.location.href=( "data:text/calendar;charset=utf8," + escape(hh.toString()));
    this.searching=false;


  } );
 


}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;










      // this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  loadSlots()
  {
    var ID = parseInt(sessionStorage.getItem("userID"))
    this.httpService.get(myGlobal.OnlineLink+ 'Api/Addbooking/mySlots/'+ID).subscribe(  
      
    data => { this.allBookings =data;
     this.EMPLOYEEs = data as unknown as string [];  
     this.DATEs = data as unknown as string []
     this.SLOTs = data as unknown as string []

     if(this.EMPLOYEEs.length==0){
      
      this.noBoookings=true;
     }
     else{
      this.noBoookings=false;
     }
    }  
  ); }
  
  update(SlotID:number){
    sessionStorage.setItem('PreviousEMPLOYEEDATETIMESLOTID',SlotID.toString());

    
   
this.bookingService.PreviousEMPLOYEEDATETIMESLOTID=SlotID;
// to update booking below
this._Router.navigate(['/UpdateBooking']);
  }

  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  delete(BOOKINGID:number){

    this.booking.BOOKINGID=BOOKINGID;
    this.booking.CLIENTID=Number(sessionStorage.getItem('clientID')); 
debugger;    // this.booking.PROPERTYID=1; //to be changed to dynammic value
    this.bookingService.DeleteBooking(this.booking).subscribe(data=>{
      this.loadSlots();
      this.calendar();
});
    

  }


  calendar(){

    var ID = parseInt(sessionStorage.getItem("userID"))

    this.httpService.get(myGlobal.OnlineLink+'Api/Addbooking/mySlotsCalendar/'+ID).subscribe(ff=>{

      this.events=ff;

  })  



  }


 

}
