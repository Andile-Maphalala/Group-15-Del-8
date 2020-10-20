import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowseProperty } from '../browse-property';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { Route, Router } from '@angular/router';
import { SearchPropety } from '../search-propety';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as myGlobal  from 'src/app/Global';


@Component({
  selector: 'app-browseproperties',
  templateUrl: './browseproperties.component.html',
  styleUrls: ['./browseproperties.component.css']
})
export class BrowsepropertiesComponent implements OnInit {
  dataSaved = false;  
  searchForm: any; 
  // updateEmployeeTypeForm: any; 
  // updateEmployeeType:any;
  allProperty:any;  
  product:BrowseProperty[];
  propertyUpdate = null;  
  message = null;  
  showModalBox: boolean = false;
  AddshowModalBox: boolean = false;
  searchedKeyword: string;

  searchText : string
  SearchBy : any ;
  isLoggedIn = false;
  notLoggedIn = true;
  nodata= false;
  names:any;
  hasApplied:boolean;
  isNotNumber:boolean;
  Property: any;

  browse= new SearchPropety();
  hideinput: boolean;
  noProperty: boolean;
  searching: boolean;
  selectedOption: string;
  selectedOption1: string;
  selectedOptionMax: string;
  allData: any;
  selectedOptionBed: string;
  Types: any;
  date: string;
  myError:any;
  allCity: any;
  allArea: any;
  searchProvinceText:any;
  searchAreaText: any;
  displayArea: boolean =false;
  selectedArea: string;
  disabledArea: boolean;
  constructor(private httpService: HttpClient,private router: Router,private formbuilderUpdate:FormBuilder,private ApiService:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.GetProvinces();
    this.getTypes();
    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.date =pipe.transform(today,'yyyy-MM-dd');debugger;
    //Boolean(JSON.parse("false"));
    this.hasApplied=Boolean(JSON.parse(sessionStorage.getItem('hasApplied')));

    if(sessionStorage.getItem('loggedInStatus')=='true')
    { this.names=sessionStorage.getItem('clientName') +" "+ sessionStorage.getItem('clientSurname') ;
      this.isLoggedIn=false;

    }
    else{

      this.isLoggedIn=true;
    }
    
    this.selectedOption = '0';
    this.selectedOptionMax = '0';

    this.selectedOption1 = "";
    this.selectedOptionBed = "0";

    this.selectedArea = "";
    this.searchForm = this.formbuilderUpdate.group({  
  
  
      SearchBy: ['', [Validators.required]], 
      searchText: ['', [Validators.required]], 
      searchText1: ['', [Validators.required]], 
      searchProvince: ['', [Validators.required]],     
      searchCity: [''],
      SearchByRentMin: [''],
      SearchByRentMax: [''],
      Bedrooms: [''],
      searchArea: [''],
      SearchByType: [''],  
    });
  }
  @ViewChild('SearchByRentMin') SearchByRentMin : any;
  @ViewChild('SearchByRentMax') SearchByRentMax : any;
  @ViewChild('SearchBy') SearchBy1 : any;
  @ViewChild('searchP') searchP : any;
  @ViewChild('searchA') searchA : any;



  validateAmount1(value,value2){debugger;

if(value>value2 && value2!="0"){
  this.searchForm.controls['SearchByRentMax'].setValue("0");
  this.SearchByRentMax.value="0";



}
else if(value==value2 && value2!="0"){
  this.searchForm.controls['SearchByRentMax'].setValue("0");
  this.SearchByRentMax.value="0";

}


  }
  validateAmount2(value,value2){debugger;

    if(value>value2 && value2!="0"){
      this.searchForm.controls['SearchByRentMin'].setValue("0");
      this.SearchByRentMin.value="0";
    
    
    
    }
    else if(value==value2 && value2!="0"){
      this.searchForm.controls['SearchByRentMin'].setValue("0");
      this.SearchByRentMin.value="0";
    
    }
    
    
      }
    

getData(){

this.allData="";

}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   onFormSubmit()
  
  {   debugger;
    this.allProperty=null;
    this.Property = null;

    this.nodata = false;
    this.isNotNumber = false;
    const search =this.searchForm.value;
    this.browse.minamount=this.searchForm.value.SearchByRentMin;
    this.browse.maxamount=this.searchForm.value.SearchByRentMax;
    // this.browse.searchvalue=this.searchForm.value.searchText;
    this.browse.type=this.searchForm.value.SearchByType;
    this.browse.minbed=this.searchForm.value.Bedrooms;
  if(this.searchForm.value.SearchBy=="Province")
    {
   

    

  
    if(this.searchForm.value.searchCity=="" &&this.searchForm.value.searchArea=="")
  {debugger;
    this.searching=true;
    this.browse.searchvalue=this.searchForm.value.searchProvince;
     this.ApiService.getPropertyByProvince(this.browse).subscribe(data => {debugger;
      this.searching=false;
      console.log(data);
      console.log(JSON.stringify(data));
     
      this.getdata(data);
      
    },(error: Error)=>{debugger;
      console.log(error["error"].Message);
      this.myError=error["error"].Message;

    }
    
    
    );
    
  }
  else if(this.searchForm.value.searchArea!="")
  {this.searching=true;
    this.browse.searchvalue=this.searchForm.value.searchArea;
     this.ApiService.getPropertyByArea(this.browse).toPromise().then(data => {
      
      this.searching=false;

      console.log(data);
      this.getdata(data);
    });

  }
  else if(this.searchForm.value.searchCity!="")
  {this.searching=true;
    this.browse.searchvalue=this.searchForm.value.searchCity;
     this.ApiService.getPropertyByCity(this.browse).toPromise().then(data => {
      this.searching=false;

      this.getdata(data);
    });

  }
}
else if(this.searchForm.value.SearchBy=="Reference"){
 
    if(isNaN(search.searchText1)==false)
    {this.searching=true;
       this.ApiService.getPropertyByReference(search.searchText1).toPromise().then(data => {
        this.searching=false;

        console.log(data);
        console.log(JSON.stringify(data));
        this.getReferencedata(data);
      });

    }
    else {
this.isNotNumber=true;

    }
  

  }}
  
  logout(){

    sessionStorage.clear();
    this.ngOnInit()
  }

  

  viewProperty(PropertyID:any)
  {  debugger;
    sessionStorage.setItem('PropertyID',PropertyID);
    this.route.navigateByUrl('/PropertyDetails');

this.ApiService.AddCount(PropertyID).subscribe(yu=>{

  
})


  
 

  }

  getReferencedata(datas){
    debugger;
    if(datas.isValid=="false")
    { 
     
       this.nodata = true;
    
    }
    
    else if(datas!=null)
    {
       this.Property = datas;
     
      
    }

  }

  getTypes(){

    
      this.httpService.get(myGlobal.OnlineLink +  'Api/Test/GetTypes').subscribe( hh=>{debugger;
    
    this.Types=hh;
    
      })
    
    
    


  }


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
this.searchForm.controls['searchCity'].setValue("");
this.searchForm.controls['searchArea'].setValue("");
    this.httpService.get(myGlobal.OnlineLink + 'Api/Test/GetCities/'+value).subscribe( hh=>{debugger;
  
  this.allCity=hh;
  
    });
  
  
  }

  getArea(value){debugger;
 
    if(value!=""){


    this.httpService.get( myGlobal.OnlineLink + 'Api/Test/GetAreas/'+value).subscribe( hh=>{debugger;
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
  

  this.httpService.get( myGlobal.OnlineLink + 'Api/Test/GetProvinces').subscribe( hh=>{debugger;

this.allData=hh;

  });


}

  hideInput(searchBy){debugger;
    
   
        if(searchBy=="Reference")
    
    {this.allProperty=null;
      this.hideinput=true;
     
    }
    else{this.Property=null;
      this.hideinput=false;
    }
//     if(searchBy=="Reference")
    
//     {
//       this.hideinput=true;
     
//     }
// else{
//   this.allData=null;
// if(searchBy=="City")
// {this.searchForm.controls['searchText'].setValue("");

//   this.httpService.get('http://localhost:30135/Api/Test/GetCities').subscribe( hh=>{debugger;

// this.allData=hh;

//   })


// }
// else if(searchBy=="Province")
// {this.searchForm.controls['searchText'].setValue("");

//   this.httpService.get('http://localhost:30135/Api/Test/GetProvinces').subscribe( hh=>{debugger;

// this.allData=hh;

//   })


// }
// else if(searchBy=="Area")
// {this.searchForm.controls['searchText'].setValue("");
//   this.httpService.get('http://localhost:30135/Api/Test/GetAreas').subscribe( hh=>{debugger;

// this.allData=hh;


//   })


// }



//   this.SearchBy1.value=searchBy;

//   this.hideinput=false;
// }


//   }
  
}


}

























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































