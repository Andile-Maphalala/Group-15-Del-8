import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Agreements} from 'src/classes/RentalAgreement';
import { AdminService } from 'src/app/admin.service';
import { saveAs as importedSaveAs } from "file-saver";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-viewextensionrequest',
  templateUrl: './viewextensionrequest.component.html',
  styleUrls: ['./viewextensionrequest.component.css']
})
export class ViewextensionrequestComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  agreementsForm: any;
  agreementForm: any; 
  allagreements: Observable<Agreements[]>;  
  loadfiltedagreememnts: Observable<Agreements[]>;  
  agreementsIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
 
 
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  @ViewChild('content2') content2 : any;
  searching: boolean;

 
  constructor(private modalService: NgbModal,private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.agreementsForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
      // RENTALSTATUSID:['', [Validators.required]], 
      // USERID:['', [Validators.required]], 
      // CLIENTID:['', [Validators.required]], 
      // RENTALAPPLICATIONID:['', [Validators.required]], 
      // PROPERTYID:['', [Validators.required]], 
      // RENTALSTARTDATE:['', [Validators.required]], 
      ExtendRentalDate:['', [Validators.required]], 
      // NAME:['', [Validators.required]], 
      // SURNAME:['', [Validators.required]], 
      // EMAIL:['', [Validators.required]], 
      // ADDRESS:['', [Validators.required]], 
      // USERNAME:['', [Validators.required]], 
   //   DepositDueDate:['', [Validators.required]], 
   
    })  
    this.loadallagreements();  
    this.agreementForm = this.formbulider.group({  
      RENTALAGREEMENTID:['', [Validators.required]], 
      // RENTALSTATUSID:['', [Validators.required]], 
      // USERID:['', [Validators.required]], 
      // CLIENTID:['', [Validators.required]], 
      // RENTALAPPLICATIONID:['', [Validators.required]], 
      // PROPERTYID:['', [Validators.required]], 
      // RENTALSTARTDATE:['', [Validators.required]], 
      ExtendRentalDate:['', [Validators.required]], 
      // NAME:['', [Validators.required]], 
      // SURNAME:['', [Validators.required]], 
      // EMAIL:['', [Validators.required]], 
      // ADDRESS:['', [Validators.required]], 
      // USERNAME:['', [Validators.required]], 
      //DepositDueDate:['', [Validators.required]], 
  
        }) 
        this.loadallagreements();  
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadallagreements() {  
    this.allagreements = this.adminService.GetRequestedExtensions();  
  }  

    
  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  openWindowCustomClass1() {
    this.modalService.open(this.content1,{ centered: true });
  }

  openWindowCustomClass2() {
    this.modalService.open(this.content2,{ centered: true });
  }
   onFormSubmit() {  
     this.dataSaved = false;  
     const agreement = this.agreementsForm.value;  
     this.UpdateAgreements(agreement);   
     this.agreementsForm.reset();  
   }  
   onFormSubmitUpdateAgreements() {  
    this.dataSaved = false;  
    const Agreements = this.agreementsForm.value;  
    this.RejExtension(Agreements);  
    this.agreementsForm.reset();  
    
  }  
  
      
  loadjobToEdit(RentalagreementID: string) {  
    this.adminService.getagreementById(RentalagreementID).subscribe(agreements=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.agreementsIdUpdate = null;  
      this.agreementsIdUpdate = agreements.RENTALAGREEMENTID;  
       this.agreementsForm.controls['RENTALAGREEMENTID'].setValue(agreements.RENTALAGREEMENTID); 
      // this.agreementForm.controls['DepositDueDate'].setValue(agreements.DepositDueDate); 
      // this.agreementForm.controls['RENTALSTATUSID'].setValue(agreements.RENTALSTATUSID); 
      // this.agreementForm.controls['USERID'].setValue(agreements.USERID); 
      // this.agreementForm.controls['CLIENTID'].setValue(agreements.CLIENTID); 
      // this.agreementForm.controls['RENTALAPPLICATIONID'].setValue(agreements.RENTALAPPLICATIONID); 
      // this.agreementForm.controls['PROPERTYID'].setValue(agreements.PROPERTYID);  
      // this.agreementForm.controls['RENTALSTARTDATE'].setValue(agreements.RENTALSTARTDATE);  
       this.agreementsForm.controls['ExtendRentalDate'].setValue(agreements.ExtendRentalDate);  
      // this.agreementForm.controls['NAME'].setValue(agreements.NAME); 
      // this.agreementForm.controls['SURNAME'].setValue(agreements.SURNAME);  
      // this.agreementForm.controls['EMAIL'].setValue(agreements.EMAIL);  
      // this.agreementForm.controls['ADDRESS'].setValue(agreements.ADDRESS);  
      // this.agreementForm.controls['USERNAME'].setValue(agreements.USERNAME);     
    }); 
  }
     
UpdateAgreements(agreements: Agreements){
      debugger;
          this.adminService.updateAgreements(agreements).subscribe(() => {  
            this.dataSaved = true;  
            this.closebutton.nativeElement.click();   
            this.massage = 'Record Updated Successfully';  
            this.loadallagreements();  
            this.searching=false; 
            this.openWindowCustomClass();
            this.modalService.dismissAll() 
            this.agreementsIdUpdate = null;  
            this.agreementForm.reset(); }
          );
      
       }
       RejExtension(Agreement: Agreements){debugger;
        debugger;
            this.adminService.RejTermination(Agreement).subscribe(() => {  
              this.dataSaved = true;  
        //      this.closebutton.nativeElement.click();   
              this.massage = 'Record Updated Successfully';  
             
              this.searching=false; 
              this.openWindowCustomClass1();
            
              this.agreementsIdUpdate = null;  
              this.agreementsForm.reset(); 
              this.modalService.dismissAll() 
              this.loadallagreements();  }
            );
        
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
      
     
  
  //  Createjob(agreements: Agreements) {  
  //    if (this.agreementsIdUpdate == null) {  debugger;
  //      this.adminService.createAgreements(agreements).subscribe(  
  //        () => {  
  //          this.dataSaved = true;  
  //         this.massage = 'Record saved Successfully';  
  //          this.loadallagreements();  
  //          this.agreementsIdUpdate = null;  
  //          this.agreementsForm.reset();  
  //        }  
  //      );  
  //    } 
  // }   
  
  // deletejob(jobId: string) {  
  //   if (confirm("Are you sure you want to delete this ?")) {   
  //   this.adminService.deleteAgreementsById(jobId).subscribe(() => {  
  //     this.dataSaved = true;  
  //     this.massage = 'Record Deleted Succefully';  
  //     this.loadallagreements();  
  //     this.agreementsIdUpdate = null;  
  //     this.agreementsForm.reset();  
  
  //   });  
  // }  
 // }  
  resetForm() {  
     this.agreementsForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
