import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/booking.service';
import { OnlineLink } from 'src/app/Global';
import { PropertyService } from 'src/app/Services/property.service';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {
  noBoookings: boolean;
  allProperty: any;
  PropertyID: string;
  searchedKeyword: string;
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
  @ViewChild('content2') content2 : any;

  constructor(private modalService: NgbModal,private httpService: HttpClient,private PropertyService:PropertyService,private _Router : Router,private route:Router ) { }
  EMPLOYEEs: string[];  
  DATEs: string[]; 
  SLOTs: string[];
  ngOnInit(): void {
    this.loadSlots();
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
  showCarret() { debugger;
    var toggler = document.getElementsByClassName("caret");
    var i;
    
    for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {

    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
    });
    }  
  }

  loadSlots()
  { 
    
    this.httpService.get(OnlineLink+'Api/Property/AllPropertyDetails').subscribe(  
    data => { this.allProperty =data; debugger;
      this.EMPLOYEEs = data as string [];  
     this.DATEs = data as string []
      this.SLOTs = data as string []
      debugger;
    


    }  
  ); }

  viewProperty(PropertyID:any)
  {  debugger;
    sessionStorage.setItem('PropertyID',PropertyID);
    this.route.navigateByUrl('/PropertyDetails');

  


  
 

  } 

  UnarchivePropertyDetails(value:number){

    this.PropertyService.Unarchive(value).subscribe(dd=>{this.loadSlots();
      this.openWindowCustomClass2();

    
    });

  }

  loadProperty(value:number){ debugger;
    this.PropertyService.PropertyID=value;
    sessionStorage.setItem('PropertyID',value.toString());
    this._Router.navigate(['update-property']);


  }

  deleteProperty(value:number){ debugger;

this.PropertyService.deletePropertyById(value).subscribe(dd=>{debugger;
if(dd[0].isValid=="false")
{ this.loadSlots();
  this.openWindowCustomClass1();
  
}
else{
  this.loadSlots();
  this.openWindowCustomClass();
}
 
  
 
  
});
    


;


  //   this.httpService.delete('http://localhost:30135/Api/Property/DeletePropertyDetails/'+value).subscribe(  
      
  //     data => { 
       
  //   );

  // }

}

}
