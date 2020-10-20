import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

 export class myFeedBack {
  FEEDBACK : String;
  COMPLAINTID:String;

   }


@Component({
  selector: 'app-search-complaint',
  templateUrl: './search-complaint.component.html',
  styleUrls: ['./search-complaint.component.css']
})


export class SearchComplaintComponent implements OnInit {
  @ViewChild('content') content : any;
  @ViewChild('content1') content1 : any;
 
  constructor(private modalService: NgbModal,private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }


  dataSaved = false;
  ProductIDUpdate = null;
  message = null;
   public products=[];
   ProductForm: any; 
   allcomplaints: any;
   complaints : Complaint[];
   myComplaint : Complaint;
   Username : string;
   searchedKeyword: string;
  myFeedBack =new myFeedBack();




  ngOnInit(): void {
    
    this.loadAllComplaints();
    this.Username = window.sessionStorage.getItem("username");
 
  }


  //ts code
  
  loadAllComplaints() {  debugger;
    this.complaintservice.getMyComplaint(Number(window.sessionStorage.getItem("clientID"))).subscribe(data => {
      console.log(data);

      this.allcomplaints = data;
    }); 

 }


 deleteComplaint(ComplaintID: number, status : string) {
  if (status == "Unresolved")
  {
  if (confirm("Are you sure you want to delete this complaint ?")) {  
  this.complaintservice.deleteComplaint(ComplaintID).subscribe(() => {
    this.dataSaved = true;
    this.message = 'Record Deleted Succefully';
    this.loadAllComplaints();
    this.openWindowCustomClass();

    // document.getElementById("openModalButton").click();
  });
}
  }
  else{
    window.alert("You cannot delete complaints that have been assigned")
  }
} 


// getUser(ID : number){
//   this.userservice.getUser(ID).subscribe(
//   (client : Client) => this.editUser(client),
//   (err: any) => console.log(err)
//   ),
//   this.userservice.getUser(ID).subscribe(
//   (client : Client) => this.client = client);
 
// }\


SendFeedback(feedback){debugger;
this.myFeedBack.FEEDBACK=feedback;
this.myFeedBack.COMPLAINTID=window.sessionStorage.getItem("ComplaintID");
this.complaintservice.SendFeedback(this.myFeedBack).subscribe(gg=>{this.loadAllComplaints();

})
  

}


AddFeedback(ComplaintID :number){


  sessionStorage.setItem('ComplaintID',ComplaintID.toString());
this.openWindowCustomClass1();

}

 editComplaint(ComplaintID : number, status : string)
  {

    if (status == "Unresolved")
    {
    sessionStorage.setItem('ComplaintID',ComplaintID.toString());
    this._Router.navigate(['update-complaint']);
    }
    else{
      window.alert("You cannot edit complaints that have been assigned")
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }

  openWindowCustomClass1() {
    this.modalService.open(this.content1,{ centered: true });
  }
}
