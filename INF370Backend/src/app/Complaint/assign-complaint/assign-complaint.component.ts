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
import { AndyEmployee } from 'src/app/Classes/AndyEmployee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assign-complaint',
  templateUrl: './assign-complaint.component.html',
  styleUrls: ['./assign-complaint.component.css']
})
export class AssignComplaintComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }

  
   
   
   allemployees: Observable<Complaint[]>;
   employees : AndyEmployee[];
   myEmployee = new AndyEmployee();
   Username : string;
   searchedKeyword: string;

  ngOnInit(): void {
    
    this.loadAllComplaints();
    this.Username = window.sessionStorage.getItem("username");
 
  }

  
  loadAllComplaints() {  
    this.allemployees = this.complaintservice.getAllEmployees(); debugger;
 }

 Assign()
 {
  //this.myEmployee.EMPLOYEEID = EmpID;
  this.myEmployee.ComplaintID = parseInt(window.sessionStorage.getItem("ComplaintID"));
  this.complaintservice.Assign(this.myEmployee).subscribe(() =>{
    document.getElementById("openModalButton").click();
    
  }
  
  );


  
 }

 Go(){
  this._Router.navigate(['view-complaints']);
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
