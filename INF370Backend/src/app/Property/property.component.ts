import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { OnlineLink } from '../Global';
import { Property } from '../models/property';
import { PropertyService } from '../Services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  allProperty: any;
  allArea: any;
  allProductTypes: any;
  @ViewChild('images') images : any;
  noimages: boolean;
  photos: any;
  thumbnail: any;
  @ViewChild('content') content : any;
  allData: Object;
  disabledArea: boolean;
  displayArea: boolean;
  allCity: Object;
  selectedOption: string;
  selectedOptionMax: string;
  selectedOption1: string;
  selectedOptionBed: string;
  selectedArea: string;
  dates: Date;
  date: string;
  minDate: string;
  disabled: boolean;
  disabl: boolean;
  selectedOptionCity: string;
  selectedOptionType: string;
  selectedOptionArea: string;
  selectedDate: string;
  constructor(private modalService: NgbModal,private sanitizer: DomSanitizer,private httpService: HttpClient,private PropertyService:PropertyService,private _Router : Router,private ApiService:ApiService ) { }
  property = new Property()
  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  ngOnInit(): void {
    var pipe = new DatePipe('en-ZA'); // Use your own locale




    this.dates =new Date();

    this.date =pipe.transform(this.dates,'yyyy-MM-dd');
    this.GetProvinces();
    this.selectedOptionMax = '0';
    
    this.selectedOption1 = "";
    this.selectedOptionBed = "0";
    
    this.selectedArea = "";
    this.empList=null;
//     this.PropertyService.getPropertyById(this.PropertyService.PropertyID).subscribe(dat=>{
// debugger;

//   })
this.PropertyToEdit();
    this.loadAllAreas();
    this.loadAllPropertyType();
 this.getPhoto();
    
  }

  loadAllAreas() {  
    this.allArea = this.ApiService.getAllArea();  
    
  } 

  loadAllPropertyType() {  
  this.PropertyService.getAllType().subscribe(kk=>{

    this.allProductTypes = kk;
    console.log(this.allProductTypes);

    });  
  
    
  } 
  
  propertyForm = new FormGroup({
    PROPERTYID : new FormControl(this.property.PROPERTYID),
    PROPERTYTYPE : new FormControl(this.property.PROPERTYTYPE, Validators.required),
    AREA : new FormControl(this.property.AREA, Validators.required),
    PROPERTYDESCRIPTION : new FormControl(this.property.PROPERTYDESCRIPTION, Validators.required),
    ADDRESS : new FormControl(this.property.ADDRESS, Validators.required),
    SIZE : new FormControl(this.property.SIZE, [Validators.required,Validators.pattern("[0-9]*")]),
    NUMBED : new FormControl(this.property.NUMBED,  [Validators.required,Validators.pattern("[0-9]*")]),
    NUMBBATH : new FormControl(this.property.NUMBBATH,  [Validators.required,Validators.pattern("[0-9]*")]),
    GARDEN : new FormControl(this.property.NUMBBATH, Validators.required),
    ADDITIONALINFO : new FormControl(this.property.ADDITIONALINFO, Validators.required),
    RENTALAMOUNT : new FormControl('', [Validators.required,Validators.pattern("[0-9]*")]),
    SearchBy: new FormControl(['', [Validators.required]]), 
    searchText:new FormControl( ['', [Validators.required]]), 
    searchText1:new FormControl( ['', [Validators.required]]), 
    searchProvince:new FormControl( ['', [Validators.required]]),     
    searchCity:new FormControl( ['']),
    PROPERTYSTATUSID:new FormControl( ['']),
    searchArea:new FormControl( ['']),
    AVAILABLEDATE:new FormControl( ['']),
  })
  
  myFiles: string[] = [];  
  empList: string[] = []; 
  sMsg: string = '';  
  StudentIdUpdate: string;  
  empLists: Array<any> = [];
    
  getFileDetails(e) {  debugger;
    //console.log (e.target.files);  
    for (var i = 0; i < e.target.files.length; i++) {  
      this.myFiles.push(e.target.files[i]);  
    }  
    this.Checkimage();
  }  

  OnSubmit() {  
    this.property = this.propertyForm.value; 
   //  this.property.PHOTO = this.selectedFiles;  
    console.log(this.property);
    debugger;
    this.PropertyService.updateProperty(this.property).subscribe(dd=>{this.uploadFiles()})
  }  

  
  Checkimage(){
    if(this.images.nativeElement.value==null)
    {
  this.noimages=true;
  
    }
    else{

      this.noimages=false;
    }


  }
  uploadFiles() {  
    const frmData = new FormData(); 
    frmData.append("PropertyID", window.sessionStorage.getItem("PropertyID")); 
    for (var i = 0; i < this.myFiles.length; i++) {  
      frmData.append("fileUpload", this.myFiles[i]);  
     
    }  

 
    this.httpService.post(OnlineLink + 'api/Property/UploadUpdatedFiles', frmData).subscribe(  
      data => {   this.openWindowCustomClass();  debugger;
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.  
        this.sMsg = data as string;  
        console.log(this.sMsg);  
      }  
    );  
  }  


  deletePhoto(value)
{
  this.httpService.get(OnlineLink + 'Api/Property/DeletePhoto/'+value).subscribe(  
      data => { 
this.getPhoto();

   
  
      }  
    );


}  

  setForm(datas){
    this.propertyForm.controls['PROPERTYID'].setValue(datas.PROPERTYID); 
    this.propertyForm.controls['SIZE'].setValue(datas.SIZE); 
    this.propertyForm.controls['PROPERTYTYPE'].setValue(datas.PROPERTYTYPEID);  
    this.propertyForm.controls['PROPERTYDESCRIPTION'].setValue(datas.PROPERTYDESCRIPTION);  
    this.propertyForm.controls['ADDRESS'].setValue(datas.ADDRESS); 
    this.propertyForm.controls['NUMBED'].setValue(datas.NUMBED);  
    this.propertyForm.controls['NUMBBATH'].setValue(datas.NUMBBATH);  
    this.propertyForm.controls['GARDEN'].setValue(datas.GARDEN);  
    this.propertyForm.controls['ADDITIONALINFO'].setValue(datas.ADDITIONALINFO);  
    this.propertyForm.controls['PROPERTYSTATUSID'].setValue(datas.PROPERTYSTATUSID);  
    this.propertyForm.controls['RENTALAMOUNT'].setValue(datas.RentalAmount);  
    this.propertyForm.controls['searchProvince'].setValue(datas.PROVINCEID);  
    this.propertyForm.controls['searchCity'].setValue(datas.CITYID);  
    this.propertyForm.controls['AREA'].setValue(datas.AREAID);  
    var pipe = new DatePipe('en-ZA'); // Use your own locale

    this.date =pipe.transform(datas.AVAILABLEDATE,'yyyy-MM-dd')
    this.propertyForm.controls['AVAILABLEDATE'].setValue(datas.AVAILABLEDATE);  

this.getCity(datas.PROVINCEID);
this.getArea(datas.CITYID);
this.loadAllPropertyType();

    this.selectedOption = String(datas.PROVINCEID);
    this.selectedOptionCity = String(datas.CITYID);
    this.selectedOptionArea = String(datas.AREAID);
    this.selectedOptionType = String(datas.PROPERTYTYPEID);


    this.selectedDate = String(datas.PROPERTYTYPEID);

    
debugger;

if(datas.PROPERTYSTATUSID!=1 ||datas.PROPERTYSTATUSID!=2)
{
this.disabl=true;

}
else{
  this.disabl=false;
  const today = new Date();

  const days = new Date(today);

  var format=days.setDate(days.getDate() + 1);debugger;

  this.minDate =pipe.transform(format,'yyyy-MM-dd');

}

 
 
    

  }
  
getPhoto(){


  this.httpService.get(OnlineLink +'Api/Property/GetPhoto/'+window.sessionStorage.getItem("PropertyID")).subscribe(  
    data => {     this.allProperty=data;

  
   


    }  
  );



}

getCity(value){debugger;
  this.displayArea=false;
  // this.allCity=null;
  this.propertyForm.controls['searchCity'].setValue("");
  this.propertyForm.controls['searchArea'].setValue("");
      this.httpService.get(OnlineLink+'Api/Property/GetCities/'+value).subscribe( hh=>{debugger;
    
    this.allCity=hh;
    
      });
    
    
    }
  
    getArea(value){debugger;
   
      if(value!=""){
  
  
      this.httpService.get(OnlineLink+'Api/Property/GetAreas/'+value).subscribe( hh=>{debugger;
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
    
  
    this.httpService.get(OnlineLink+'Api/Test/GetProvinces').subscribe( hh=>{debugger;
  
  this.allData=hh;
  
    });
  
  
  }







  
  PropertyToEdit() {  


    

    
  
    this.httpService.get(OnlineLink+'Api/Property/PropertyDetails/'+window.sessionStorage.getItem("PropertyID")).subscribe(  
      data => {     debugger;

this.setForm(data);
      //   this.EMPLOYEEs = data as string [];  
      //  this.DATEs = data as string []
      //   this.SLOTs = data as string []
      //   debugger;
      //   if(this.EMPLOYEEs.length==0){
        
      //     this.noBoookings=true;
      //    }
      //    else{
      //     this.noBoookings=false;
      //    }
          
  
  
      }  
    );






    // this.ApiService.getEmployeeTypeById(EmployeeTypeId).subscribe(employeeType=> {  
    //   console.log(employeeType);
    //   this.message = null;  
    //   this.dataSaved = false;  
    //   this.updateEmployeeTypeForm.controls['EMPLOYEETYPEDESCRIPTION'].setValue(employeeType.EMPLOYEETYPEDESCRIPTION);        

    //   this.updateEmployeeTypeForm.controls['EMPLOYEETYPEID'].setValue(employeeType.EMPLOYEETYPEID); 
            
  
      
    // });  
  
  }  

}
