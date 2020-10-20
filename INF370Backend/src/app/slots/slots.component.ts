import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Item} from 'src/classes/Item';
import {Purchase} from 'src/classes/Purchase';
import {Slot} from 'src/classes/Slot';
import {PurchaseLine} from 'src/classes/PurchaseLine';
import { MaintenanceService } from 'src/app/maintenance.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  SlotForm: any;  
  deleteForm: any; 
  allslots: Observable<Slot[]>; 
  sloteIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  updateSlotForm: any; 
  //updateSlotForm:any;
  product:Slot[];
  searchedKeyword: string;
  
  
  
  constructor(private modalService: NgbModal,private _Router : Router,private formbulider: FormBuilder,private manService:MaintenanceService) { }  
  ngOnInit(): void { 


    this.updateSlotForm = this.formbulider.group({  
      SLOTID:['', [Validators.required]], 
      STARTTIME:['', [Validators.required]],  
      ENDTIME:['', [Validators.required]],  
     
     
    })  
    this.SlotForm = this.formbulider.group({  
      //SUPPLIERID:['', [Validators.required]],  
      STARTTIME:['', [Validators.required]],  
      ENDTIME:['', [Validators.required]],  
        }) 
    this.loadAllslots();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
 loadAllslots() {  
  this.allslots = this.manService.getAllSlots();  
}  
    
  
   onFormSubmit() {  
     this.dataSaved = false;  
     const supps = this.SlotForm.value;  
     this.Createslots(supps);  
     this.SlotForm.reset();  
   }  
   onFormSubmitUpdateEmployee() {  
        this.dataSaved = false;  
        const supps = this.updateSlotForm.value;  
         this.UpdateSlots(supps);  
        this.updateSlotForm.reset();  
        
      }  
      onFormSubmitUpdatedelete() {  
        this.dataSaved = false;  
        const supps = this.updateSlotForm.value;  
         this.deleteSlot(supps);  
        this.updateSlotForm.reset();  
        
      }  
  
  

      
      // loadslotToEdit(slotId: string) {  
      //   this.manService.getSlotById(slotId).subscribe(slots => {  
      //     this.massage = null;  
      //     this.dataSaved = false;  
      //     this.sloteIdUpdate = slots;
      //     this.sloteIdUpdate = slots.SLOTID;  
      //     this.updateSlotForm.controls['SLOTID'].setValue(slots.SLOTID); 
      //     this.updateSlotForm.controls['STARTTIME'].setValue(slots.STARTTIME); 
      //     this.updateSlotForm.controls['ENDTIME'].setValue(slots.ENDTIME); 
              
      //   }); 
      // }
          
      loadslotToEdit(slotId: string) {  
        this.manService.getSlotById(slotId).subscribe(slots=> {  
          this.massage = null;  
          this.dataSaved = false;  
          this.sloteIdUpdate = slots.SLOTID;  
          this.updateSlotForm.controls['SLOTID'].setValue(slots.SLOTID); 
          this.updateSlotForm.controls['STARTTIME'].setValue(slots.STARTTIME); 
          this.updateSlotForm.controls['ENDTIME'].setValue(slots.ENDTIME); 
       
        
              
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

  
       @ViewChild('content') content : any;
       @ViewChild('content') content1 : any;
       
       openWindowCustomClass() {
        this.modalService.open(this.content,{ centered: true });
       }
       openWindowCustomClass1() {
         this.modalService.open(this.content,{ centered: true });
        }
        UpdateSlots(slots:Slot){
          debugger;
                this.manService.Updateslots(slots).subscribe(() => {  
                  this.closebutton.nativeElement.click(); 
                this.dataSaved = true;  
                this.massage = 'Record Updated Successfully';  
                this.loadAllslots();  
                this.sloteIdUpdate = null;  
                this.openWindowCustomClass();   
                this.updateSlotForm.reset(); }
             );
         
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
                this.SlotForm.reset();  
              }  
            );  
          } 
       }   
    
  
  deleteSlot(slotId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.manService.deleteSlotById(slotId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllslots();  
      this.SlotForm = null;  
      this.SlotForm.reset();  
  
    });  
  }  
  }  
  resetForm() {  
     this.SlotForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
