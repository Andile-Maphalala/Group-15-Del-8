import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-complaint',
  templateUrl: './search-complaint.component.html',
  styleUrls: ['./search-complaint.component.css']
})
export class SearchComplaintComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }


  dataSaved = false;
  ProductIDUpdate = null;
  message = null;
   public products=[];
   ProductForm: any; 
   allcomplaints: Observable<Complaint[]>;
   complaints : Complaint[];
   myComplaint : Complaint;
   Username : string;
   searchedKeyword: string;

  ngOnInit(): void {
    
    this.loadAllComplaints();
    this.Username = window.sessionStorage.getItem("username");
 
  }

  
  loadAllComplaints() {  
    this.allcomplaints = this.complaintservice.getAllComplaint(); 
 }


 deleteComplaint(ComplaintID: number) {
  if (this.myComplaint.ComplaintStatus == "Unassigned")
  {
  if (confirm("Are you sure you want to delete this ?")) {  
  this.complaintservice.deleteComplaint(ComplaintID).subscribe(() => {
    this.dataSaved = true;
    this.message = 'Record Deleted Succefully';
    this.loadAllComplaints();
    this.ProductIDUpdate = null;
    this.ProductForm.reset();

  });
}
  }
  else{
    window.alert("You cannot delete complaints that have been assigned")
  }
} 




 editComplaint(ComplaintID : number)
  {
    if (this.myComplaint.ComplaintStatus == "Unassigned")
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
}
