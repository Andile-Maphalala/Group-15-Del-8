import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { AddUser } from 'src/app/Classes/AddUser';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})



export class AddUserComponent implements OnInit {
 

  constructor(private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) { }



  user  = new AddUser();
  userClientForm: any; 


  userForm = new FormGroup({
    Name : new FormControl(this.user.Name, Validators.required),
    Surname : new FormControl(this.user.Surname, Validators.required),
    PhoneNo : new FormControl(this.user.PhoneNo, Validators.required),
    Email : new FormControl(this.user.Email, Validators.required),
    Username : new FormControl(this.user.Username, Validators.required),
    Password : new FormControl(this.user.Password, Validators.required),
    PassportNo : new FormControl(this.user.PassportNo, Validators.required),
    Nationality : new FormControl(this.user.Nationality, Validators.required),
    DOB : new FormControl(this.user.DOB, Validators.required),
    IsStudent : new FormControl(this.user.IsStudent, Validators.required),
    Residental :new FormControl(this.user.Residental, Validators.required),
    Postal : new FormControl(this.user.Postal, Validators.required),
    Employer : new FormControl(this.user.Employer, Validators.required),
    Occupation : new FormControl(this.user.Occupation, Validators.required),
    WorkAddress : new FormControl(this.user.WorkAddress, Validators.required),
    WorkTel : new FormControl(this.user.WorkTel, Validators.required),
    GrossSalary : new FormControl(this.user.GrossSalary, Validators.required),
    
  })
  ngOnInit(): void 
  {
    // this.userClientForm = this.formbulider.group({
    //   Name : ['', [Validators.required]],
    //   Surname : ['', [Validators.required]],
    //   PhoneNo : ['', [Validators.required]],
    //   Email : ['', [Validators.required]],
    //   Username : ['', [Validators.required]],
    //   Password : ['', [Validators.required]],
    //   PassportNo : ['', [Validators.required]],
    //   Nationality : ['', [Validators.required]],
    //   DOB : ['', [Validators.required]],
    //   IsStudent : ['', [Validators.required]],
    //   Residental :['', [Validators.required]],
    //   Postal : new FormControl('' ,Validators.required),
    //   Employer : ['', [Validators.required]],
    //   Occupation : ['', [Validators.required]],
    //   WorkAddress : ['', [Validators.required]],
    //   WorkTel : ['', [Validators.required]],
    //   GrossSalary : ['', [Validators.required]],
      
    // })
  }

  OnSubmit(){
    console.log(this.userForm)
    //this.userservice.AddUserPost(this.user)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

//user.Name,user.Surname,user.PhoneNo,user.Email,user.Username,
  //                     user.Password,user.PassportNo,user.Nationality,user.DOB,user.IsStudent,user.Residental,user.Postal,
  //                     user.Employer,user.Occupation,user.WorkAddress,user.WorkTel,user.GrossSalary


//   this.userClientForm = this.formbulider.group({
//     Name : ['', [Validators.required]],
//     Surname : ['', [Validators.required]],
//     PhoneNo : ['', [Validators.required]],
//     Email : ['', [Validators.required]],
//     Username : ['', [Validators.required]],
//     Password : ['', [Validators.required]],
//     PassportNo : ['', [Validators.required]],
//     Nationality : ['', [Validators.required]],
//     DOB : ['', [Validators.required]],
//     IsStudent : ['', [Validators.required]],
//     Residental :['', [Validators.required]],
//     Postal : new FormControl('' ,Validators.required),
//     Employer : ['', [Validators.required]],
//     Occupation : ['', [Validators.required]],
//     WorkAddress : ['', [Validators.required]],
//     WorkTel : ['', [Validators.required]],
//     GrossSalary : ['', [Validators.required]],
    
//   })
// }