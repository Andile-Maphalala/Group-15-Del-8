import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { AddUser } from 'src/app/Classes/AddUser';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';
import { Injectable } from '@angular/core';
import { DisplayUser } from 'src/app/Classes/DisplayUser';
import { Client } from 'src/app/Classes/Client';
import { Deactivate } from 'src/app/Classes/Deactivate';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  isStudent: boolean;
  verified: any;

  constructor(private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) { }

  CurrentUser = "";
  ID : number;
  myClient  = new AddUser();
  showModalBox: boolean = false;
  dataSaved = false;    
  message = null;  
  AddshowModalBox: boolean = false;
  deactivate = new Deactivate()

 ngOnInit(): void {
   //window.sessionStorage.setItem("UserID","2");
   this.ID = parseInt(sessionStorage.getItem("userID"))
   this.getUser(this.ID);

  this.verified=Boolean(window.sessionStorage.getItem('verified'));
this.CurrentUser = window.sessionStorage.getItem('username');
 }

  
  getUser(ID : number){
    this.userservice.getUser(ID).subscribe(
    (client : Client) => this.editUser(client),
    (err: any) => console.log(err)
    ),

    this.userservice.getUser(ID).subscribe(client=>{ 
      this.myClient = client
      this.getdata(this.myClient);})
    // (client : Client) => this.myClient = client);
   
  }

  editUser(client : Client){

    this.myClient.Name = client.Name,
    this.myClient.Surname = client.Surname,
    this.myClient.PhoneNo = client.PhoneNo,
    this.myClient.Email = client.Email,
    this.myClient.PassportNo = client.PassportNo,
    this.myClient.Nationality = client.Nationality,
    this.myClient.DOB = client.DOB,
    this.myClient.IsStudent = client.IsStudent,
    this.myClient.Residental =client.Residental,
    this.myClient.Postal = client.Postal,
    this.myClient.Employer = client.Employer,
    this.myClient.Occupation = client.Occupation,
    this.myClient.WorkAddress = client.WorkAddress,
    this.myClient.WorkTel = client.WorkTel,
    this.myClient.GrossSalary = client.GrossSalary


}

getdata(datas){
   debugger;
  if(datas.IsStudent==false)
{

this.isStudent=false;
}
else{
this.isStudent=true;

}

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


public open() {
  if(0){
    // Dont open the modal
    this.showModalBox = false;
  } else {
     // Open the modal
     this.showModalBox = true;
  }

}

deactivateForm = new FormGroup({
  Reason : new FormControl('',[Validators.required])
})

Open(){
  document.getElementById("openModalButton").click();
}

Deactivate()
{

  this.deactivate.Reason = this.deactivateForm.value.Reason;
  this.deactivate.UserID = this.ID;

this.userservice.Deactivate(this.deactivate);
}

}
