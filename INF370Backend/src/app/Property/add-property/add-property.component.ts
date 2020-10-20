import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';
import { Observable } from 'rxjs'; 
import {PropertyService} from 'src/app/Services/property.service';
import{Property} from 'src/app/models/property';
import {Router} from '@angular/router'
import { Area } from 'src/classes/area';
import { PropertType } from 'src/app/models/propert-type';
import {ApiService} from 'src/app/api.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlineLink } from 'src/app/Global';

@Component({
  selector: 'app-add-property',
  templateUrl: 'add-property.component.html',
  styleUrls: ['add-property.component.css']
  ,providers:[PropertyService]
})

export class AddPropertyComponent implements OnInit {  
  dataSaved = false;  
  massage = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  property = new Property()
  fileToUpload: File = null;
  image: any;
  imageUrl : any;
  reader = new FileReader();
  selectedFiles: FileList;
  progressInfos = [];
   //Area
   allArea: any;  
   @ViewChild('content') content : any;

   //Proptype
   allProductTypes : Observable<PropertType[]>;  
  remark: string | Blob;
  noimages: boolean=true;
  @ViewChild('images') images : any;
  allData: Object;
  disabledArea: boolean;
  displayArea: boolean=false;
  allCity: Object;
  selectedOption: string;
  selectedOptionMax: string;
  selectedOption1: string;
  selectedOptionBed: string;
  selectedArea: string;

  constructor(private formbuilderUpdate:FormBuilder,private modalService: NgbModal,private httpService: HttpClient,private _Router : Router ,private formbulider: FormBuilder,private propertyService:PropertyService,private ApiService:ApiService) { }  
  
  myFiles: string[] = [];  
    
  sMsg: string = '';  
  StudentIdUpdate: string;  
 
    
  getFileDetails(e) {  debugger;
    //console.log (e.target.files);  
    for (var i = 0; i < e.target.files.length; i++) {  
      this.myFiles.push(e.target.files[i]);  
    }  
    this.Checkimage();
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
    for (var i = 0; i < this.myFiles.length; i++) {  
      frmData.append("fileUpload", this.myFiles[i]);  
     
    }  

 
    this.httpService.post(OnlineLink+'api/Property/UploadFiles', frmData).subscribe(  
      data => {  
        this.propertyForm.reset();
        this.openWindowCustomClass(); debugger;

        // SHOW A MESSAGE RECEIVED FROM THE WEB API.  
        this.sMsg = data as string;  
        console.log(this.sMsg);  
      }  
    );  
  }  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ngOnInit(): void {  
   //this.loadAllAreas();
   this.loadAllPropertyType();
   this.GetProvinces();

this.selectedOption = '0';
this.selectedOptionMax = '0';

this.selectedOption1 = "";
this.selectedOptionBed = "0";

this.selectedArea = "";
  //   this.propertyForm = this.formbuilderUpdate.group({  
  
  
  //     SearchBy: ['', [Validators.required]], 
  //     searchText: ['', [Validators.required]], 
  //     searchText1: ['', [Validators.required]], 
  //     searchProvince: ['', [Validators.required]],     
  //     searchCity: [''],
  //     SearchByRentMin: [''],
  //     SearchByRentMax: [''],
  //     Bedrooms: [''],
  //     searchArea: [''],
  //     SearchByType: [''],  
  //   });

   }  

  propertyForm = new FormGroup({
    PROPERTYTYPE : new FormControl(this.property.PROPERTYTYPE, Validators.required),
    AREA : new FormControl(this.property.AREA, Validators.required),
    PROPERTYDESCRIPTION : new FormControl(this.property.PROPERTYDESCRIPTION, Validators.required),
    ADDRESS : new FormControl(this.property.ADDRESS, Validators.required),
    SIZE : new FormControl(this.property.SIZE, [Validators.required,Validators.pattern("^[1-9][0-9]*$")]),
    NUMBED : new FormControl(this.property.NUMBED,  [Validators.required,Validators.pattern("^[1-9][0-9]*$")]),
    NUMBBATH : new FormControl(this.property.NUMBBATH,  [Validators.required,Validators.pattern("^[1-9][0-9]*$")]),
    GARDEN : new FormControl(this.property.GARDEN, Validators.required),
    ADDITIONALINFO : new FormControl(this.property.ADDITIONALINFO, Validators.required),
    RENTALAMOUNT : new FormControl('', [Validators.required,Validators.pattern("^[1-9][0-9]*$")]),
    SearchBy: new FormControl(['', [Validators.required]]), 
    searchText:new FormControl( ['', [Validators.required]]), 
    searchText1:new FormControl( ['', [Validators.required]]), 
    searchProvince:new FormControl( ['', [Validators.required]]),     
    searchCity:new FormControl( ['']),
    AVAILABLEDATE:new FormControl( ['']),
   // SearchByRentMin:new FormControl( ['']),
   // SearchByRentMax:new FormControl( ['']),
    //Bedrooms:new FormControl( ['']),
    searchArea:new FormControl( ['']),
    //SearchByType:new FormControl( ['']), 

    // PHOTO : new FormControl(this.property.PHOTO, Validators.required),
  })

  minDate: Date = new Date ();


  loadAllAreas() {  
    this.allArea = this.ApiService.getAllArea();  
    
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

  loadAllPropertyType() {  
    this.allProductTypes = this.propertyService.getAllType();  
    console.log(this.allProductTypes);
    
  } 
  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  OnSubmit() {  
     this.dataSaved = false;  
     this.property = this.propertyForm.value; 
    //  this.property.PHOTO = this.selectedFiles;  
     console.log(this.property);
     debugger;
     this.propertyService.createProperty(this.property).subscribe(dd=>{this.uploadFiles();})
   }  

   selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;


    // var reader = new FileReader();
    // reader.readAsText(this.selectedFiles);
    //console.log(this.selectedFiles)
  }

  //  handleFileInput(file: FileList) {
    
  //   this.fileToUpload = file.item(0);
  //   //Show image preview
  //   var reader = new FileReader();
  //   // reader.onload = (event:any) => {
  //   //   this.imageUrl = event.target.result;
  //   // }
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  

  //     public Addopen() {
  //   if(0){
  //     // Dont open the modal
  //     this.AddshowModalBox = false;
  //   } else {
  //      // Open the modal
  //      this.AddshowModalBox = true;
  //   }

  // }

 
  // public open() {
  //   if(0){
  //     // Dont open the modal
  //     this.showModalBox = false;
  //   } else {
  //      // Open the modal
  //      this.showModalBox = true;
  //   }
  // }

  
  
 
  

  // resetForm() {  
  //    this.propertyForm.reset();  
  //    this.massage = null;  
  //    this.dataSaved = false;  
  //    }  
     
}