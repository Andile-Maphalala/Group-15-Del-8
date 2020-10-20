import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Agreements} from 'src/classes/RentalAgreement';
import { AdminService } from 'src/app/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { saveAs as importedSaveAs } from "file-saver";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-extend-agreement',
  templateUrl: './extend-agreement.component.html',
  styleUrls: ['./extend-agreement.component.css']
})
export class ExtendAgreementComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addTypeclosebutton;
  dataSaved = false;  
  clientForm: any;
  clients: any; 
  loadfilteredcln: Observable<Agreements[]>;  
  dueIdUpdate = null;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  @ViewChild('resumeInput', { static: true }) resumeInput;
  @ViewChild('logoInput', { static: true }) logoInput;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  lstFileDetails: any;
  @ViewChild('content') content : any;
 
  searching: boolean;
 
 

 
  constructor(private modalService: NgbModal,private formbulider: FormBuilder,private adminService:AdminService) { }  
  ngOnInit(): void {  
    this.clientForm = this.formbulider.group({ 
      
      RENTALAGREEMENTID:['', [Validators.required]], 
     // RENTALAPPLICATIONID:['', [Validators.required]], 
     // DepositDueDate: ['', [Validators.required]], 
  
   
    })  
    this.saveFileForm = this.formbulider.group({
    });
    this.adminService.getFiles().subscribe(result => {
      this.lstFileDetails = result;
    })
    
    this.loadClient();  
    this.clientForm = this.formbulider.group({  
      RENTALAGREEMENTID:['', [Validators.required]], 
    //  RENTALAPPLICATIONID:['', [Validators.required]], 
    ///  DepositDueDate: ['', [Validators.required]], 
        }) 
        this.loadClient(); 
  }  
  downloadIDENTITYDOCUMENT(data) {
    const IDENTITYDOCUMENTName = data.IDENTITYDOCUMENT;
    var IDENTITYDOCUMENT = IDENTITYDOCUMENTName.slice(0, -5);
    this.adminService.downloadFile(IDENTITYDOCUMENT).subscribe((
      data) => {
      importedSaveAs(data, IDENTITYDOCUMENT)
    });
  }
  
  onSelectFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onExpSubmit() {

    debugger;
    if (this.saveFileForm.invalid) {
      return;
    }


    let formData = new FormData();
   
    formData.append('FileUpload', this.resumeInput.nativeElement.files[0]);
    
    


    this.adminService.AddFileDetails(formData).subscribe(result => {
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
 
 }
  loadClient() {  
     this.clients = this.adminService.Getagreement();  
  }  

  onFormSubmit() {  
    this.dataSaved = false;  
    const Agreement = this.clientForm.value;  
    this.UpdateExtenddate(Agreement);  
    this.clientForm.reset(); 
  }  


  

      
  loaddueToEdit(RentalagreementID: string) {  
    this.adminService.getdueById(RentalagreementID).subscribe(cln=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.dueIdUpdate = null;  
      this.dueIdUpdate = cln.RENTALAGREEMENTID;  
      this.clientForm.controls['RENTALAGREEMENTID'].setValue(cln.RENTALAGREEMENTID); 
    // //  this.clientForm.controls['RENTALAPPLICATIONID'].setValue(cln.RENTALAPPLICATIONID); 
    //   //this.clientForm.controls['PREFERREDSTARTDATE'].setValue(cln.PREFERREDSTARTDATE); 
    // this.clientForm.controls['DepositDueDate'].setValue(cln.DepositDueDate); 
    //   this.clientForm.controls['RENTALSTATUSID'].setValue(cln.RENTALSTATUSID); 
    //   this.clientForm.controls['CLIENTID'].setValue(cln.CLIENTID); 
    //   this.clientForm.controls['PROPERTYID'].setValue(cln.PROPERTYID);  
    //   this.clientForm.controls['RENTALSTARTDATE'].setValue(cln.RENTALSTARTDATE);  
    //   this.clientForm.controls['RENTALENDDATE'].setValue(cln.RENTALENDDATE);  
    //   this.clientForm.controls['PAYMENTID'].setValue(cln.PAYMENTID); 
    //   this.clientForm.controls['NAME'].setValue(cln.NAME); 
    
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
     
UpdateExtenddate(cln: Agreements){  debugger;
          this.adminService.updateextend(cln).subscribe(() => {  
            this.closebutton.nativeElement.click(); 
            this.dataSaved = true;  
            this.massage = 'Record Updated Successfully';  
            this.searching=false; 
            this.openWindowCustomClass();

            this.dueIdUpdate = null;  
            this.clientForm.reset(); }
          );
      
        }
    
      
         
  
  
        openWindowCustomClass() {
          this.modalService.open(this.content,{ centered: true });
        }

  resetForm() {  
     this.clientForm.reset();  
     this.massage = null;  
     this.dataSaved = false;  
     }  
     
}
