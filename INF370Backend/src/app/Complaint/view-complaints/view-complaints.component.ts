import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AndyEmployee } from 'src/app/Classes/AndyEmployee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class ViewComplaintsComponent implements OnInit {

  constructor(private modalService: NgbModal,private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }

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
   myEmployee = new AndyEmployee();

  ngOnInit(): void {

    this.loadAllComplaints();
    this.Username = window.sessionStorage.getItem("username");
    
  }
  @ViewChild('content') content : any;


  loadAllComplaints() {  
    this.allcomplaints = this.complaintservice.GetUnassignedComplaints(); 
 }

//  Assin(ComplaintID : number)
//  {
//   sessionStorage.setItem('ComplaintID',ComplaintID.toString());
//   this._Router.navigate(['assign-complaint']);
//  }

 Assin(ComplaintID : number)
 {
  //this.myEmployee.EMPLOYEEID = EmpID;
  this.myEmployee.ComplaintID =ComplaintID;
  this.complaintservice.Assign(this.myEmployee).subscribe(() =>{this.openWindowCustomClass();
    this.loadAllComplaints();
  //  document.getElementById("openModalButton").click();
    
  }
  
  );


  
 }


 openWindowCustomClass() {
  this.modalService.open(this.content,{ centered: true });
}






 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
}

}
