import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';
import { MbscEventcalendarOptions, mobiscroll } from '@mobiscroll/angular';
import * as XLSX from 'xlsx';
import { OnlineLink } from '../Global';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  allBookings:any;
  booking = new Booking();
  searchedKeyword: string;
  constructor(private httpService: HttpClient,private bookingService:BookingService) { }  
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  allData: any;
  mySlots: any;
  objects: any;
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
    








  ngOnInit() { 
    this.AllMySlotsCalendars()
    this.loadSlots()};
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      // this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  loadSlots()
  { this.httpService.get(OnlineLink+'Api/GetAvailableSlots/BookedSlots').subscribe(  
    data => { this.allBookings =data; debugger;
     this.EMPLOYEEs = data as unknown as string [];  
     this.DATEs = data as unknown as string []
     this.SLOTs = data as unknown as string []
    }  
  ); }
  
  OnSubmit1(BOOKINGID){debugger;
    this.booking.BOOKINGID=BOOKINGID;
    this.booking.CLIENTID=Number(sessionStorage.getItem('clienID')); //to be changed to dynammic value
    this.booking.PROPERTYID=1; //to be changed to dynammic value
    this.bookingService.UpdateBooking(this.booking).subscribe(data=>{});
    this.loadSlots();
    
  }
  @ViewChild('TABLE') table: ElementRef;
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'Schedule.xlsx');
  
}
AllMySlotsCalendars(){

  this.httpService.get(OnlineLink+'Api/AddBooking/AllMySlotsCalendars').subscribe( hh=>{debugger;

 // this.mySlots=hh[0];
  this.events=hh;
  debugger;
  
    })


}




}
