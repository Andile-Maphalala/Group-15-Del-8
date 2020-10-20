import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../application';
import { FormBuilder, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { TerminateRService } from '../terminate-r.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../api.service';
import * as myGlobal  from '../Global';
//import { Date } from 'src/classes/Date';

//import {NgbModal, ModalDismissReasons} 
///import { Date } from 'src/classes/Date';

@Component({
  selector: 'app-apply-for-rental-agreement',
  templateUrl: './apply-for-rental-agreement.component.html',
  styleUrls: ['./apply-for-rental-agreement.component.css'],
  providers: [DatePipe]
})

export class ApplyForRentalAgreementComponent implements OnInit {

  @ViewChild('modal') modal: any;
  dataSaved = false;
  applicationForm: any;
  allApplications: Observable<Application[]>;
  applicationIdUpdate = null;
  massage = null;
  @ViewChild('resumeInput', { static: false }) resumeInput;
  @ViewChild('logoInput', { static: false }) logoInput;
  @ViewChild('Bursary', { static: false }) Bursary;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  lstFileDetails: any;
  propertyID: number;
  APPLICATIONDATE=new Date() ;
  clientID: string;
  isStudent: boolean;
  minDate:string;
  showModalBox: boolean;
  noID: boolean=true;
  noPayslip: boolean=true;
  noBursary: boolean=true;
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  @ViewChild('content2') content2 : any;


  searching: boolean;
  allProperty: any;
  
  constructor(private ApiService:ApiService,private modalService: NgbModal,private httpService: HttpClient ,private formbulider: FormBuilder, private applicationService:MyServiceService,private service:TerminateRService,private router:Router) { }
  CLIENTs: string[];
  ngOnInit() {
    this.loadPropertyDetails();
    this.propertyID=this.applicationService.PropertyID;
    //this.APPLICATIONDATE= Date.now().toString();
    // this.minDate.toLocaleDateString();
    

    var pipe = new DatePipe('en-ZA'); // Use your own locale


    const today = new Date()
    const days = new Date(today)
    var format=days.setDate(days.getDate() + 10)
    
    this.clientID=sessionStorage.getItem('clientID');
    debugger;
    this.httpService.get( myGlobal.OnlineLink+ 'Api/Apply/Apply/'+this.clientID).subscribe(
      (data:any) => {debugger;
        if(data[0]==null)
        {


        }
      
     
        this.getdata(data);
       this.CLIENTs = data as unknown as string[];
       console.log(data);
      }, (error: HttpErrorResponse) => {debugger;
        console.log(error.error["Message"]); 
        
      }
    );
    this.saveFileForm = this.formbulider.group({
      PREFERREDDATE: ['', [Validators.required]],
      // PAYSLIP: ['', [Validators.required]],
      // BURSARYLETTER: ['', [Validators.required]]
    });
    this.applicationForm = this.formbulider.group({
      APPLICATIONDATE: ['', [Validators.required]],
      PROPERTYID: ['', [Validators.required]],
      CLIENTID: ['', [Validators.required]],
    });
    this.loadAllApplications();
  }

  loadPropertyDetails(){

    this.ApiService.getPropertyByReference1(sessionStorage.getItem('PropertyID')).toPromise().then(data => {
      debugger;
      console.log(data);
      this.allProperty = data; 
      var pipe = new DatePipe('en-ZA'); // Use your own locale
      const today = new Date()
      const days = new Date(today)
      var datemin=pipe.transform(this.allProperty.AVAILABLEDATE,'yyyy-MM-dd')
      var datetod=pipe.transform(today,'yyyy-MM-dd')

      if(datemin>datetod)
      {debugger;

      

      }
else{
  var format=days.setDate(days.getDate() + 1)

  this.minDate =pipe.transform(format,'yyyy-MM-dd');


}
      
      debugger;});
  }






  loadAllApplications() {
    this.allApplications = this.applicationService.getAllApplication();
  }
  getdata(datas){
    
    if(datas[0].isStudent==false)
{debugger

  this.isStudent=false;
}
else{
  this.isStudent=true;

}

  }


  onFormSubmit() {
   
    this.dataSaved = false;
    const application = this.applicationForm.value;
    this.CreateApplication(application);
    this.applicationForm.reset();
  }
  loadApplicationToEdit(applicationId: string) {
    this.applicationService.getApplicationById(applicationId).subscribe(application=> {
      this.massage = null;
      this.dataSaved = false;
      this.applicationIdUpdate = application.RENTALAPPLICATIONID;
      this.applicationForm.controls['APPLICATIONDATE'].setValue(application.APPLICATIONDATE);


    });

  }
  CreateApplication(application: Application) {
    if (this.applicationIdUpdate == null) {
      this.applicationService.createApplication(application).subscribe(
        () => { 
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllApplications();
          this.applicationIdUpdate = null;
          this.applicationForm.reset();
        }
      );
    } else {
      application.RENTALAPPLICATIONID = this.applicationIdUpdate;
      this.applicationService.updateApplication(application).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllApplications();
        this.applicationIdUpdate = null;
        this.applicationForm.reset();
      });
    }
  }

  resetForm() {
    this.applicationForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
  onExpSubmit() {
    this.searching=true;
    debugger;
    // if (this.saveFileForm.invalid) {
    //   return;
    // }


    let formData = new FormData();
    if(this.resumeInput.nativeElement.files[0]==null){
 
    }
    else{
      formData.append('IDENTITYDOCUMENT', this.resumeInput.nativeElement.files[0]);
    }

    if(this.logoInput.nativeElement.files[0]==null){
      

    }
    else{
      formData.append('PAYSLIP', this.logoInput.nativeElement.files[0]);
    }
    if(this.Bursary.nativeElement.files[0]==null){ debugger;
      
    }
      else{
        formData.append('BURSARYLETTER', this.Bursary.nativeElement.files[0]); 
       
      }


    
    if(this.clientID){ 
      formData.append('CLIENTID', this.clientID);
    }
    if(Number(sessionStorage.getItem('PropertyID'))){
      formData.append('PROPERTYID',sessionStorage.getItem('PropertyID'));
    }
    
    formData.append('PREFERREDDATE',this.saveFileForm.value.PREFERREDDATE.toUTCString( ));
    ;
    
    
    
   
debugger;

//this.modal.show();
    this.service.AddFileDetails(formData).subscribe(result => {
if(result=="false")
{

  this.exists();

}
else if(result=="active")
{

  this.existsAgreement();

}
else{

  this.accept();

}
      this.searching=false;
    // this.router.navigateByUrl('/');
    });

  }

  existsAgreement(){

    this.modalService.open(this.content2,{ centered: true });


  }
  exists(){

    this.modalService.open(this.content1,{ centered: true });


  }



  bursary(){

    if(this.Bursary.nativeElement.value==null)
    {
  this.noBursary=true;
  
    }
    else{

      if(this.Bursary.nativeElement.files[0].size>2097152)
      {
  
        alert("Upload files smaller than 2mb")
        this.Bursary.nativeElement.value=null;
      }
      else{
        this.noBursary=false;
       
      }
    }


  }

  accept() {
    this.modalService.open(this.content,{ centered: true });
  } 



  payslip(){

    

    if(this.logoInput.nativeElement.value==null)
    {
  this.noPayslip=true;
  
    }
    else{
      if(this.logoInput.nativeElement.files[0].size>2097152)
      {
  
        alert("Upload files smaller than 2mb")
        this.logoInput.nativeElement.value=null;
      }
      else{
        this.noPayslip=false;
       
      }
    }
  
  }

id(){
debugger;
  if(this.resumeInput.nativeElement.value==null)
  {
this.noID=true;

  }
  else{
    if(this.resumeInput.nativeElement.files[0].size>2097152)
    {

      alert("Upload files smaller than 2mb")
      this.resumeInput.nativeElement.value=null;
    }
    else{
      this.noID=false;
     
    }
    
  }

}



  public open() {

       // Open the modal
       this.showModalBox = true;
  

  }
  
}

