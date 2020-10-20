import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Slot} from 'src/app/classes/Slot';
import {Date} from 'src/app/classes/Date';
import { MaintenanceService } from 'src/app/Services/maintenance.service';
import { DateTimeSlot } from 'src/app/Classes/DateTime';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MbscEventcalendarOptions, mobiscroll } from '@mobiscroll/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as myGlobal  from 'src/app/Global';


@Component({
  selector: 'app-setup-viewing-schedule',
  templateUrl: './setup-viewing-schedule.component.html',
  styleUrls: ['./setup-viewing-schedule.component.scss'],
})
export class SetupViewingScheduleComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  dateForm: any;  
  UpdatedateForm: any;  
  dateslotsForm: any; 
  slotsForm: any; 
  alldates: Observable<Date[]>;  
  alldatetimeslots: Observable<DateTimeSlot[]>;  
  allslots: Observable<Slot[]>;
  allCity: any;
  allArea: any;
  disabledArea: boolean;
  displayArea: boolean =false;
  allProperty:any;  
  nodata= false;


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
  selectedArea: string;
    
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
       

      
        mobiscroll.toast({ 
              
              message: event.event.text,
              display:"center",
              color:"info" 
          });
      }
  };
    
  

  constructor(private httpService : HttpClient,private modalService: NgbModal,private _Router : Router,private formbulider: FormBuilder,private manService:MaintenanceService) { }

  ngOnInit() {
    if (sessionStorage.getItem('EmployeeID') == null) {
      this._Router.navigate(['']);
    }


    this.dateForm = this.formbulider.group({  
    
      DATEID:['', [Validators.required]],  
      SLOTID:['', [Validators.required]],
      searchProvince: ['', [Validators.required]],     
      searchCity: ['',[Validators.required]],
      searchArea: ['',[Validators.required]],
    }) 

    this.UpdatedateForm = this.formbulider.group({  
    
      DATEID:[''],  
      SLOTID:[''],
      searchProvince: ['', [Validators.required]],     
      searchCity: ['',[Validators.required]],
      searchArea: ['',[Validators.required]],
    }) 

    this.loadAlldates();  
    this.loadAllslots();
    //this.loadAreas();
    this.loadMySlots();


    this.selectedArea = "";
    this.GetProvinces();
  }




  loadAreas(){
    this.httpService.get(myGlobal.OnlineLink + 'api/Location/GetAreas').subscribe( hh=>{

    this.allData=hh;
    //console.log(this.allData);
    
    
      })

   }
   
   loadMySlots(){
    var ID = parseInt(sessionStorage.getItem("EmployeeID"))

    this.httpService.get(myGlobal.OnlineLink + 'Api/Maintenance/GetMySlots/'+ID).subscribe( hh=>{

    this.mySlots=hh[0];
    this.events=hh[1];
    
    
      })

   }



  loadAlldates() {  
    this.alldates = this.manService.getAllDates();   ;
}  
loadAllslots() {  
    this.allslots = this.manService.getAllSlots();  
}  
loaddatetimeslot() {  
    this.alldatetimeslots = this.manService.getAllDateSlots();  
}  

onDateFormSubmit() { 
  this.dataSaved = false;  
 //  const dates = this.dateForm.value;  
this.DateTimeSlot.DATEID=this.dateForm.value.DATEID;
this.DateTimeSlot.SLOTID=this.dateForm.value.SLOTID;
this.DateTimeSlot.AREAID = this.dateForm.value.searchArea;
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
 


    
Createdates(dates: Date) {  
  if (this.dateIdUpdate == null) {  
    this.manService.CreateDates(dates).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.closebutton.nativeElement.click(); 
       this.massage = 'Record saved Successfully';  
        this.loadAlldates();  
        this.loadMySlots();
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


@ViewChild('success') success : any;
@ViewChild('error') error : any;
@ViewChild('Update') Update : any;
@ViewChild('errorUpdate') errorUpdate : any;
@ViewChild('updatesuccess') updatesuccess : any;
@ViewChild('showcancel') showcancel : any;
@ViewChild('successdelete') successdelete : any;
@ViewChild('wrong') wrong : any;

UpdateSlot(slotID : number) {
  window.sessionStorage.setItem("EmployeeDateTimeSLotID",slotID.toString())
this.manService.GetDatetimeslotbyId(slotID).subscribe(data =>{ debugger;
  this.AssignSlot(data)
  
}
  )

  this.modalService.open(this.Update,{ centered: true });

 }

 ShowCancelModel(slotID : number)
 {
  window.sessionStorage.setItem("EmployeeDateTimeSLotID",slotID.toString())
  this.modalService.open(this.showcancel,{ centered: true });
 }


deleteSlot()
{
  this.manService.DeleteSlot(Number(window.sessionStorage.getItem("EmployeeDateTimeSLotID"))).subscribe(data =>
    {
      if(Boolean(data)==true)
      {
        this.modalService.dismissAll();
        this.loaddatetimeslot(); 
        this.loadAlldates();  
        this.loadAllslots();
        this.loadAreas();
        this.loadMySlots();
        this.modalService.open(this.successdelete,{ centered: true });

      }
      else{
        this.modalService.open(this.wrong,{ centered: true });

      }
    })
}

 OnUpdate(){
  // this.DateTimeSlot.DATEID=this.UpdatedateForm.value.DATEID;
  // this.DateTimeSlot.SLOTID=this.UpdatedateForm.value.SLOTID;
  // this.DateTimeSlot.AREAID = this.UpdatedateForm.value.searchArea;\
  this.DateTimeSlot = this.UpdatedateForm.value; debugger;
  if(this.DateTimeSlot.DATEID.toString() ==  "" )
  {
    this.DateTimeSlot.DATEID=Number(window.sessionStorage.getItem("DATEID"));
  }
  if(this.DateTimeSlot.SLOTID.toString() ==  "" )
  {
    this.DateTimeSlot.SLOTID=Number(window.sessionStorage.getItem("SLOTID"));
  }
  this.DateTimeSlot.EmployeeID=Number(window.sessionStorage.getItem("EmployeeID"));
  this.DateTimeSlot.EmployeeDateTimeSLotID=Number(window.sessionStorage.getItem("EmployeeDateTimeSLotID"));
this.manService.UpdateDatetimeslotbyId(this.DateTimeSlot).subscribe(data => {
  console.log(data);
  if(Boolean(data)==false){
    this.ShowUpdaterror();
  }
else{
  this.massage = 'Record saved Successfully';  
  this.loaddatetimeslot(); 
  this.loadAlldates();  
  this.loadAllslots();
  this.loadAreas();
  this.loadMySlots();

  this.dateslotsIdUpdate = null;  
  this.dateForm.reset();
  this.ShowUpdatesuccess();
}
})

 }

 
ShowUpdaterror() {
  this.modalService.dismissAll();
  this.modalService.open(this.errorUpdate,{ centered: true });
 }
 ShowUpdatesuccess() {
   this.modalService.dismissAll();
  this.modalService.open(this.updatesuccess,{ centered: true });
 }




 AssignSlot(slot : DateTimeSlot)
 {
  console.log(slot)

   this.DateTimeSlot.AREAID = slot.AREAID;
   this.DateTimeSlot.DATEID = slot.DATEID;
   this.DateTimeSlot.DATETIMESLOTID = slot.DATETIMESLOTID;
   this.DateTimeSlot.EmployeeID = slot.EmployeeID;
   this.DateTimeSlot.SLOTID = slot.SLOTID;
   window.sessionStorage.setItem("SLOTID",slot.SLOTID.toString())
   window.sessionStorage.setItem("DATEID",slot.DATEID.toString())

 }
 

openWindowCustomClass() {
 this.modalService.open(this.success,{ centered: true });
}



ShowError() {
  this.modalService.open(this.error,{ centered: true });
 }

CreateDateTimeSlot(datetimeslots: DateTimeSlot) {  
 if (this.dateslotsIdUpdate == null) {  
   this.manService.CreateDateTimeSlots(datetimeslots).subscribe(  
     data => {  
     debugger;
      if(Boolean(data)==false){
        this.ShowError();
      }
    else{
      this.massage = 'Record saved Successfully';  
      this.loaddatetimeslot(); 
      this.loadAlldates();  
      this.loadAllslots();
      this.loadAreas();
      this.loadMySlots();
  
      this.dateslotsIdUpdate = null;  
      this.dateForm.reset();
      this.openWindowCustomClass();
    }
       this.dataSaved = true;  
       // this.closebutton.nativeElement.click(); 
     
       //this._Router.navigate(["/setupviewingschedule"])

     }  
   );  
 } 
}   
////////////////////////////////////////////////////////////////////////////
getdata(datas){
  debugger;
 if(datas[0].isValid=="false")
 { 
   
    this.nodata = true;
 
 
 }
 
 else if(datas!=null)
 {
    this.allProperty = datas;
  
   
 }
 
   }
 
   getCity(value){debugger;
 this.displayArea=false;
 // this.allCity=null;
//  this.dateForm.controls['searchCity'].setValue("");
//  this.dateForm.controls['searchArea'].setValue("");
     this.httpService.get(myGlobal.OnlineLink + 'Api/Maintenance/GetCities/'+value).subscribe( hh=>{
   
   this.allCity=hh;
   console.log(this.allCity)
   
     });
   
   
   }
 
   getArea(value){debugger;
  
     if(value!=""){
 
 
     this.httpService.get(myGlobal.OnlineLink + 'Api/Maintenance/GetAreas/'+value).subscribe( hh=>{debugger;
     this.displayArea=true;
   this.allArea=hh;
 
   if(this.allArea.length==1)
   {
 this.disabledArea=true;
 
 
   }
   else{
 
     this.disabledArea=false;
 
 
   }
   
     });
   
   }
   }
 
 
 
   GetProvinces(){
   
 
   this.httpService.get(myGlobal.OnlineLink + 'Api/Maintenance/GetProvinces').subscribe( hh=>{;
 
 this.allData=hh;
 //console.log(this.allData);
 
   });
 
 
 }


     







////////////////////////////////////////////////////////////////////////////////////////////////////
}
