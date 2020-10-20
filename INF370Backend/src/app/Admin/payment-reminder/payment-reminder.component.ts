import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Agreements} from 'src/classes/RentalAgreement';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-payment-reminder',
  templateUrl: './payment-reminder.component.html',
  styleUrls: ['./payment-reminder.component.css']
})
export class PaymentReminderComponent implements OnInit {

  dataSaved = false;  
  clientForm: any;
  clients: Observable<Agreements[]>;  
  loadfilteredcln: Observable<Agreements[]>;  
  dueIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
 
 

 
  constructor(private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.clientForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
       DepositDueDate:['', [Validators.required]],  
      RENTALSTATUSID:['', [Validators.required]],  
      CLIENTID: ['', [Validators.required]],  
      RENTALAPPLICATIONID:['', [Validators.required]],  
      PROPERTYID:['', [Validators.required]],  
      RENTALSTARTDATE:['', [Validators.required]],  
      RENTALENDDATE:['',[Validators.required]],
      PAYMENTID:['', [Validators.required]], 
      NAME:['', [Validators.required]],  
      SURNAME:['',[Validators.required]],
      PHONENUMBER:['', [Validators.required]], 
      
  
   
    })  
    this.loadClient();  
    this.clientForm = this.formbulider.group({  
      RENTALAGREEMENTID:['', [Validators.required]], 
      DepositDueDate:['', [Validators.required]],  
      RENTALSTATUSID:['', [Validators.required]],  
      CLIENTID: ['', [Validators.required]],  
      RENTALAPPLICATIONID:['', [Validators.required]],  
      PROPERTYID:['', [Validators.required]],  
      RENTALSTARTDATE:['', [Validators.required]],  
      RENTALENDDATE:['',[Validators.required]],
      PAYMENTID:['', [Validators.required]], 
      NAME:['', [Validators.required]],  
      SURNAME:['',[Validators.required]],
      PHONENUMBER:['', [Validators.required]], 
     
        }) 

  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadClient() {  
    this.clients = this.adminService.GETClient();  
  }  

  onFormSubmit() {  
    this.dataSaved = false;  
    const Employee = this.clientForm.value;  
    //this.Updateduedate(Employee);  
    this.clientForm.reset();  
    
  }  


  

      
  loaddueToEdit(RentalagreementID: string) {  
    this.adminService.getdueById(RentalagreementID).subscribe(cln=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.dueIdUpdate = null;  
      this.dueIdUpdate = cln.RENTALAGREEMENTID;  
      this.clientForm.controls['RENTALAGREEMENTID'].setValue(cln.RENTALAGREEMENTID); 
      this.clientForm.controls['DepositDueDate'].setValue(cln.DepositDueDate); 
      this.clientForm.controls['RENTALSTATUSID'].setValue(cln.RENTALSTATUSID); 
      this.clientForm.controls['CLIENTID'].setValue(cln.CLIENTID); 
      this.clientForm.controls['RENTALAPPLICATIONID'].setValue(cln.RENTALAPPLICATIONID); 
      this.clientForm.controls['PROPERTYID'].setValue(cln.PROPERTYID);  
      this.clientForm.controls['RENTALSTARTDATE'].setValue(cln.RENTALSTARTDATE);  
      this.clientForm.controls['RENTALENDDATE'].setValue(cln.RENTALENDDATE);  
      this.clientForm.controls['PAYMENTID'].setValue(cln.PAYMENTID); 
      this.clientForm.controls['NAME'].setValue(cln.NAME); 
    
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
     
Updateduedate(cln: Agreements){  debugger;
          this.adminService.updatedue(cln).subscribe(() => {  
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.dueIdUpdate = null;  
            this.clientForm.reset(); }
          );
      
        }
    
      
         
  
  
 

  resetForm() {  
     this.clientForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
