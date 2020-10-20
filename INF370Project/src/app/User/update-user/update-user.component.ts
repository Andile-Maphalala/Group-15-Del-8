import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @ViewChild('content') content : any;
  isStudent: boolean;
  usrEx: boolean;
  showNotSA: boolean =true;
  showSA: boolean =true;

  constructor(private modalService: NgbModal,private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) { }
  selection : number = 1;
  options = [
    {id : 1, text: "Yes", value : true},
    {id : 2, text: "No", value : false},
  ];

  client  = new AddUser();
  userForm = new FormGroup({
    // Name : new FormControl(this.client.Name,[Validators.required, Validators.pattern("[A-Za-z ]*")]),
    // Surname : new FormControl(this.client.Surname, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    // PhoneNo : new FormControl(this.client.PhoneNo, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    // Email : new FormControl(this.client.Email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    // PassportNo : new FormControl(this.client.PassportNo, [ Validators.pattern("[0-9 ]*")]),
    // IdNo : new FormControl(this.client.PassportNo, [ Validators.pattern("[0-9 ]*")]),
    // Nationality : new FormControl(this.client.Nationality, Validators.required),
    // DOB : new FormControl(this.client.DOB, Validators.required),
    // IsStudent : new FormControl(this.client.IsStudent, Validators.required),
    // Residental :new FormControl(this.client.Residental, Validators.required),
    // Postal : new FormControl(this.client.Postal, Validators.required),
    // Employer : new FormControl(this.client.Employer, Validators.required),
    // Occupation : new FormControl(this.client.Occupation, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    // WorkAddress : new FormControl(this.client.WorkAddress, Validators.required),
    // WorkTel : new FormControl(this.client.WorkTel, [Validators.required, Validators.pattern("[0-9 ]*")]),
    // GrossSalary : new FormControl(this.client.GrossSalary, [Validators.required, Validators.pattern("[0-9 ]*")]),
    // ID : new FormControl(this.client.ID, [Validators.required, Validators.pattern("[0-9 ]*")]),
    Name : new FormControl(this.client.Name,[Validators.required, Validators.pattern("[A-Za-z]*")],),
    // Username : new FormControl(this.client.Username,[Validators.required,Validators.pattern("^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$")]), 
    // Password : new FormControl(this.client.Password,[Validators.required,Validators.pattern("[^ ]+")]),
     Surname : new FormControl(this.client.Surname, [Validators.required, Validators.pattern("[A-Za-z]*")]),
    PhoneNo : new FormControl(this.client.PhoneNo, [Validators.required, Validators.pattern("[0-9]{10}"),Validators.maxLength(10),Validators.minLength(10)]),
    Email : new FormControl(this.client.Email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],), 
    PassportNo : new FormControl(this.client.PassportNo, [ Validators.pattern("^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$")]),
    IdNo : new FormControl(this.client.IdNo, [Validators.pattern("[0-9]*"),Validators.maxLength(13),Validators.minLength(1)]),
    Nationality : new FormControl(this.client.Nationality, Validators.required),
    DOB : new FormControl(this.client.DOB, Validators.required),
    IsStudent : new FormControl(this.client.IsStudent, Validators.required),
    Residental :new FormControl(this.client.Residental, Validators.required),
    Postal : new FormControl(this.client.Postal, Validators.required),
    Employer : new FormControl(this.client.Employer, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    Occupation : new FormControl(this.client.Occupation, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    WorkAddress : new FormControl(this.client.WorkAddress, Validators.required),
    WorkTel : new FormControl(this.client.WorkTel, [Validators.required, Validators.pattern("[0-9]*"),Validators.maxLength(10),Validators.minLength(10)]),
    GrossSalary : new FormControl(this.client.GrossSalary, [Validators.required, Validators.pattern("[0-9]*")]),

  })

  CurrentUser = "";
   ID : number;
  ngOnInit(): void {
   
     this.ID = parseInt(window.sessionStorage.getItem("userID"))
    
    this.getUser(this.ID);

   
this.CurrentUser = window.sessionStorage.getItem('username');


  }

  
  onNationalityChange(value){
    if(value=="South African")
    {
      this.showNotSA=true;
this.showSA=false;
this.userForm.controls['PassportNo'].setValue(null);
    }
else
{
  this.showSA=true;
  this.showNotSA=false;
  this.userForm.controls['IdNo'].setValue(null);  
}
  }
  onCountryChange(value){ debugger;

 if(value=="true"){

this.isStudent=true;

 }
  
  else{
    this.isStudent=false;
  }
  }
  getUser(ID : number){
    this.userservice.getUser(ID).subscribe(
    (client : Client) => this.editUser(client),
    (err: any) => console.log(err)
    ),
    this.userservice.getUser(ID).subscribe(
    (client : Client) => this.client = client);
   
  }

  editUser(client : Client){debugger;

    if(client.Nationality=="South African")
    {
      this.showSA=false;
    
    }
    else{
    
      this.showNotSA=false;
    }

    if (client.IsStudent == true)
    {
      this.selection = 2
      this.isStudent=true;
      Boolean 
    }
    else{
      this.selection = 1
      this.isStudent=false;

    }
 
    this.userForm.patchValue({

      Name : client.Name,
      Surname : client.Surname,
      PhoneNo : client.PhoneNo,
      Email : client.Email,
      PassportNo : client.PassportNo,
      IdNo : client.IdNo,
      Nationality : client.Nationality,
      DOB : client.DOB,
      ID:client.UserID,
      //IsStudent : this.selection,
      IsStudent : client.IsStudent,
      Residental :client.Residental,
      Postal : client.Postal,
      Employer : client.Employer,
      Occupation : client.Occupation,
      WorkAddress : client.WorkAddress,
      WorkTel : client.WorkTel,
      GrossSalary : client.GrossSalary
      
    
    }) 


}

// OnSubmit(){
//   this.client = this.userForm.value;

//   this.client.ID = this.ID;
//   this.userservice.UpdateUserPost(this.client)
//   document.getElementById("openModalButton").click();
//   this._Router.navigate(['view-user'])

// }


OnSubmit(){
  this.usrEx = false;
  

  

 
      this.addStudent();
    
    
  
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  // this.dataSource.filter = filterValue.trim().toLowerCase();
}

isEnabled  : boolean = true;


openWindowCustomClass() {
  this.modalService.open(this.content,{ centered: true });
}

addStudent(){

 
  this.client = this.userForm.value;
  this.client.ID = this.ID;
  debugger;
this.userservice.UpdateUserPost(this.client).subscribe(dats=>{
  sessionStorage.setItem('clientName',this.client.Name);
  sessionStorage.setItem('clientSurname',this.client.Surname);
  this._Router.navigate(['view-user']);
  this.openWindowCustomClass();
})




//document.getElementById("openModalButton").click();




  // const addStudentClient = this.userForm.value;
  // this.AddStudent(addStudentClient);
  // this.userForm.reset();



}

// AddStudent(addStudentClient:AddUser){



// }


AddStudent() {  
  this.usrEx = false;
  
  

      this.addStudent();
    
    
    
} 







}

