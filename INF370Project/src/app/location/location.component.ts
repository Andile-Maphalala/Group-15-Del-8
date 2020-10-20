import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from 'src/classes/city';
import { Area } from 'src/classes/area';
import { Province } from 'src/classes/province';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  //Area
  @ViewChild('closebutton') closebutton;
  @ViewChild('addAreaclosebutton') addAreaclosebutton;

  //City
   @ViewChild('UpdateCityclosebutton') UpdateCityclosebutton;
   @ViewChild('addCityclosebutton') addCityclosebutton;

  //Province
  @ViewChild('UpdateProvinceclosebutton') UpdateProvinceclosebutton;
  @ViewChild('addProvinceclosebutton') addProvinceclosebutton;
  

  //City
  dataSaved = false;  
  cityForm: any; 
  updateCityForm: any; 
  updateCity:any;
  allCity: Observable<City[]>;  
  //product:City[];
  cityUpdate = null;  
  message = null;  
  cityShowModalBox: boolean = false;
  AddshowModalBox: boolean = false;

   //Area
   AreadataSaved = false;  
   areaForm: any; 
   updateAreaForm: any; 
   updateArea:any;
   allArea: Observable<Area[]>;  
   //product:Area[];
   areaUpdate = null;  
   AreaMessage = null;  
   areaShowModalBox: boolean = false;

      //Province
   ProvincedataSaved = false;  
   provinceForm: any; 
   updateProvinceForm: any; 
   updateProvince:any;
   allProvince: Observable<Province[]>;  
   //product:Area[];
   provinceUpdate = null;  
   ProvinceMessage = null;  
   provinceShowModalBox: boolean = false;
   searchedKeyword1: string;
   searchedKeyword2: string;
   searchedKeyword3: string;

  constructor(private formbuilder: FormBuilder,private formbuilderUpdate: FormBuilder,private ApiService:ApiService) { }

  ngOnInit(): void {
    //area
    this.updateAreaForm = this.formbuilder.group({  
  
  
      AREANAME: ['', [Validators.required]],  
      CITYID: ['', [Validators.required]],  
      AREAID: ['', [Validators.required]],
    });
    this.areaForm = this.formbuilderUpdate.group({  
  
  
      AREANAME: ['', [Validators.required]],  
      CITYID: ['', [Validators.required]],  
    });  
    //city
    this.updateCityForm = this.formbuilder.group({  
  
      CITYID:['', [Validators.required]],  
      CITYNAME: ['', [Validators.required]],  
      PROVINCEID: ['', [Validators.required]],  
    });
    this.cityForm = this.formbuilderUpdate.group({  
  
  
      PROVINCEID: ['', [Validators.required]],  
      CITYNAME: ['', [Validators.required]],  
    }); 
    //Province
    this.updateProvinceForm = this.formbuilder.group({  
  
  
      PROVINCEID: ['', [Validators.required]],  
      PROVINCENAME: ['', [Validators.required]],  
    });
    this.provinceForm = this.formbuilderUpdate.group({  
  
  
      PROVINCENAME: ['', [Validators.required]],  
    });

    this.loadAllCities();
    this.loadAllProvinces();
    this.loadAllAreas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

//City|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  loadAllCities() {  
    this.allCity = this.ApiService.getAllCity();  
    
  }  

    
  onFormSubmitCity() {  
    this.dataSaved = false;  
    const City = this.cityForm.value;  
    this.CreateCity(City);  
    this.cityForm.reset();  
  }  

  onFormSubmitUpdateCity() {  
    this.dataSaved = false;  
    const City = this.updateCityForm.value;  
    this.UpdateCity(City);  
    this.updateCityForm.reset();  
    
  }  


  loadCityToEdit(CityId: string) {  
  
    this.ApiService.getCityById(CityId).subscribe(City=> {  
      
      this.message = null;  
      this.dataSaved = false;  
      this.updateCityForm.controls['CITYID'].setValue(City.CITYID);        
      this.updateCityForm.controls['CITYNAME'].setValue(City.CITYNAME); 
      this.updateCityForm.controls['PROVINCEID'].setValue(City.PROVINCEID);       
  
      
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

 
  public CityOpen() {
    if(0){
      // Dont open the modal
      this.cityShowModalBox = false;
    } else {
       // Open the modal
       this.cityShowModalBox = true;
    }

  }

  UpdateCity(city: City){
debugger;
    this.ApiService.updateCity(city).subscribe(() => {  
      this.UpdateCityclosebutton.nativeElement.click(); 
      this.dataSaved = true;  
      this.message = 'Record Updated Successfully';  
      this.loadAllCities();  
      this.cityUpdate = null;  
      this.updateCityForm.reset(); }
    );

  }


  CreateCity(city: City) {  
  debugger;
      this.ApiService.createCity(city).subscribe(  
        () => {  
          this.addCityclosebutton.nativeElement.click(); 
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllCities();  
          this.cityUpdate = null;  
          this.cityForm.reset();  
        }  
      );  
  } 



  deleteCity(cityId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.ApiService.deleteCityById(cityId).subscribe(() => {  

      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllCities();
      this.cityUpdate = null;  
      this.cityForm.reset();  
  
    });  
  } }

  //Area|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  loadAllAreas() {  
    this.allArea = this.ApiService.getAllArea();  
    
  }  

    
  onFormSubmitArea() {  
    this.dataSaved = false;  
    const Area = this.areaForm.value;  
    this.CreateArea(Area);  
    this.areaForm.reset();  
  }  

  onFormSubmitUpdateArea() {  
    this.dataSaved = false;  
    const Area = this.updateAreaForm.value;  
    this.UpdateArea(Area);  
    this.updateAreaForm.reset();  
    
  }  


  loadAreaToEdit(AreaId: string) {  
  
    this.ApiService.getAreaById(AreaId).subscribe(Area=> {  
      console.log(Area);
      
      this.AreaMessage = null;  
      this.AreadataSaved = false;  
      this.updateAreaForm.controls['AREAID'].setValue(Area.AREAID);        
      this.updateAreaForm.controls['CITYID'].setValue(Area.CITYID); 
      this.updateAreaForm.controls['AREANAME'].setValue(Area.AREANAME);       
      debugger;
      
    });  
  
  }  

 

 
  public AreaOpen() {
    if(0){
      // Dont open the modal
      this.areaShowModalBox = false;
    } else {
       // Open the modal
       this.areaShowModalBox = true;
    }

  }

  UpdateArea(area: Area){
debugger;
    this.ApiService.updateArea(area).subscribe(() => { 
      this.closebutton.nativeElement.click(); 
      this.dataSaved = true;  
      this.AreaMessage = 'Record Updated Successfully';  
      this.loadAllAreas();  
      
      this.areaUpdate = null; 

      this.updateAreaForm.reset();
      
      
     }
    );

  }


  CreateArea(area: Area) {  
  debugger;
      this.ApiService.createArea(area).subscribe(  
        () => {  
          this.addAreaclosebutton.nativeElement.click(); 
          this.AreadataSaved = true;  
          this.AreaMessage = 'Record saved Successfully';  
          this.loadAllAreas();  
          this.areaUpdate = null;  
          this.areaForm.reset();  
        }  
      );  
  } 



  deleteArea(areaId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.ApiService.deleteAreaById(areaId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllAreas();
      this.areaUpdate = null;  
      this.areaForm.reset();  
  
    });  
  } }

 //Province|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 loadAllProvinces() {  
  this.allProvince = this.ApiService.getAllProvince();  
  
}  

  
onFormSubmitProvince() {  
  this.ProvincedataSaved = false;  
  const Province = this.provinceForm.value;  
  this.CreateProvince(Province);  
  this.provinceForm.reset();  
}  

onFormSubmitUpdateProvince() {  
  this.ProvincedataSaved = false;  
  const Province = this.updateProvinceForm.value;  
  this.UpdateProvince(Province);  
  this.updateProvinceForm.reset();  
  
}  


loadProvinceToEdit(ProvinceId: string) {  

  this.ApiService.getProvinceById(ProvinceId).subscribe(Province=> {  
    
    this.ProvinceMessage = null;  
    this.ProvincedataSaved = false;  
    this.updateProvinceForm.controls['PROVINCEID'].setValue(Province.PROVINCEID);        
    this.updateProvinceForm.controls['PROVINCENAME'].setValue(Province.PROVINCENAME); 
         

    
  });  

}  




public ProvinceOpen() {
  if(0){
    // Dont open the modal
    this.provinceShowModalBox = false;
  } else {
     // Open the modal
     this.provinceShowModalBox = true;
  }

}

UpdateProvince(Province: Province){
debugger;
  this.ApiService.updateProvince(Province).subscribe(() => { 
    this.UpdateProvinceclosebutton.nativeElement.click();  
    this.ProvincedataSaved = true;  
    this.ProvinceMessage = 'Record Updated Successfully';  
    this.loadAllProvinces();  
    this.provinceUpdate = null;  
    this.updateProvinceForm.reset(); }
  );

}


CreateProvince(Province: Province) {  

    this.ApiService.createProvince(Province).subscribe(  
      () => {  
        this.addProvinceclosebutton.nativeElement.click(); 

        this.ProvincedataSaved = true;  
        this.ProvinceMessage = 'Record saved Successfully';  
        this.loadAllProvinces();  
        this.provinceUpdate = null;  
        this.provinceForm.reset();  
      }  
    );  
} 



deleteProvince(provinceId: string) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.ApiService.deleteProvinceById(provinceId).subscribe(() => {  
    this.ProvincedataSaved = true;  
    this.ProvinceMessage = 'Record Deleted Succefully';  
    this.loadAllProvinces();
    this.provinceUpdate = null;  
    this.provinceForm.reset();  

  });  
} }




}
