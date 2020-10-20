import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Slot} from 'src/classes/Slot';
import {Date} from 'src/classes/Date';
import { MaintenanceService } from 'src/app/maintenance.service';
import { DateTimeSlot } from 'src/app/Classes/DateTime';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MbscEventcalendarOptions, mobiscroll } from '@mobiscroll/angular';
import { OnlineLink } from 'src/app/Global';

@Component({
  selector: 'app-setupviewingschedule',
  templateUrl: './setupviewingschedule.component.html',
  styleUrls: ['./setupviewingschedule.component.css']
})
export class SetupviewingscheduleComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
    @ViewChild('addAreaclosebutton') addTypeclosebutton;
    dataSaved = false;  
    dateForm: any;  
    dateslotsForm: any; 
    slotsForm: any; 
    alldates: Observable<Date[]>;  
    alldatetimeslots: Observable<DateTimeSlot[]>;  
    allslots: Observable<Slot[]>; 
    
    dateIdUpdate = null;  
    sloteIdUpdate = null; 
    dateslotsIdUpdate = null;
   
    massage = null;  
    showModalBox: boolean = false;
    AddshowModalBox: boolean = false;
  
    DateTimeSlot =new DateTimeSlot();
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
    
    
    
    constructor(private httpService: HttpClient,private router: Router,private formbuilderUpdate:FormBuilder,private route:Router,private modalService: NgbModal,private _Router : Router,private formbulider: FormBuilder,private manService:MaintenanceService) { 
   
     
    }  

  
    
    ngOnInit(): void {  
     

      this.dateForm = this.formbulider.group({  
    
        DATEID:['', [Validators.required]],  
        SLOTID:['', [Validators.required]],
        AREAID:['', [Validators.required]],

      })  
      this.loadAlldates();  
      this.loadAllslots();
      this.loadAreas();
      this.loadMySlots();
    // this.calendar();
    }  

  //   calendar(){

  //     var ID = parseInt(sessionStorage.getItem("userID"))
  
  //     this.httpService.get('http://localhost:30135/Api/Addbooking/mySlotsCalendar/'+6).subscribe(ff=>{
  // debugger;
  //       this.events=ff;
  
  //   })  
  
  
  
  //   }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
   
   }


   loadAreas(){
    this.httpService.get(OnlineLink + 'Api/Test/GetAreas').subscribe( hh=>{debugger;

    this.allData=hh;
    
    
      })

   }
   
   loadMySlots(){
    var ID = parseInt(sessionStorage.getItem("EmployeeID"))

    this.httpService.get(OnlineLink + 'Api/Maintenance/GetMySlots/'+ID).subscribe( hh=>{debugger;

    this.mySlots=hh[0];
    this.events=hh[1];
    debugger;
    
      })

   }
   loadAlldates() {  
      this.alldates = this.manService.getAllDates();  debugger;
  }  
  loadAllslots() {  
      this.allslots = this.manService.getAllSlots();  
  }  
  loaddatetimeslot() {  
      this.alldatetimeslots = this.manService.getAllDateSlots();  
  }  
 
      
  update(hh){}
  delete(hh){}

    
     onDateFormSubmit() {  debugger;
       this.dataSaved = false;  
this.DateTimeSlot.DateID=this.dateForm.value.DATEID;
this.DateTimeSlot.SlotID=this.dateForm.value.SLOTID;
this.DateTimeSlot.AreaID=this.dateForm.value.AREAID;
this.DateTimeSlot.EmployeeID=Number(window.sessionStorage.getItem("EmployeeID"));
       this.CreateDateTimeSlot(this.DateTimeSlot);  
     }  
     onSlotFormSubmit() {  
      this.dataSaved = false;  
      const slot = this.slotsForm.value;  
      this.Createslots(slot);  
      this.slotsForm.reset();  
    }  
    onDateTimeFormSubmit() {  
      this.dataSaved = false;  
      const dateslots = this.dateslotsForm.value;  
      this.CreateDateTimeSlot(dateslots);  
      this.dateslotsForm.reset();  
    }  
    
     
    
  
        
    loadslotToEdit(slotId: string) {  
      this.manService.getSlotById(slotId).subscribe(slots => {  
        this.massage = null;  
        this.dataSaved = false;  
        this.sloteIdUpdate = slots;
        this.dateslotsForm.controls['SLOTID'].setValue(slots.SLOTID); 
        
            
      }); 
    }
     
 
        public Addopen() {
      if(0){
        // Dont open the modal
        this.AddshowModalBox = false;
      } else {
         // Open the modal
         this.AddshowModalBox = true;
      }
  
    }
  
   
    public open() {
      if(0){
        // Dont open the modal
        this.showModalBox = false;
      } else {
         // Open the modal
         this.showModalBox = true;
      }
    }

    
    
  Createdates(dates: Date) {  
       if (this.dateIdUpdate == null) {  
         this.manService.CreateDates(dates).subscribe(  
           () => {  
             this.dataSaved = true;  
             this.closebutton.nativeElement.click(); 
            this.massage = 'Record saved Successfully';  
             this.loadAlldates();  
             this.dateIdUpdate = null;  
             this.dateForm.reset();  
           }  
         );  
       } 
    }   
    Createslots(slots: Slot) { 
      if (this.sloteIdUpdate == null) {   
        this.manService.CreateSlots(slots).subscribe(  
          () => {  
 
            this.dataSaved = true;  
            this.closebutton.nativeElement.click(); 
           this.massage = 'Record saved Successfully';  
            this.loadAllslots();  
            this.sloteIdUpdate = null;  
            this.slotsForm.reset();  
          }  
        );  
      } 
   }   

   @ViewChild('content') content : any;
   @ViewChild('content1') content1 : any;

   SlotError() {
    this.modalService.open(this.content1,{ centered: true });
  }
   openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }
   CreateDateTimeSlot(datetimeslots: DateTimeSlot) {  
    if (this.dateslotsIdUpdate == null) {  
      this.manService.CreateDateTimeSlots(datetimeslots).subscribe(  
        data => {            this.dataSaved = true;  
debugger;
          if(Boolean(data)==false){
            this.SlotError();
          }
        else{
         this.massage = 'Record saved Successfully';  
          this.loaddatetimeslot();  
          this.dateslotsIdUpdate = null;  
          this.dateForm.reset();
          this.openWindowCustomClass();
          this._Router.navigate(["/setupviewingschedule"])
        }

        } );  
    } 
  }   
  

  
    
   
  }
  