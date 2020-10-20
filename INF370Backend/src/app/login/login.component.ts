import { Component, OnInit } from '@angular/core';  
//import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';  
import { FormBuilder, Validators } from '@angular/forms';
import {APIService} from "src/app/Services/api.service";
import { Router} from '@angular/router';
import { Location } from '@angular/common';

 @Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']  
})  

export class LoginComponent implements OnInit {  
  saveInProgress: boolean=false;
  successmsg: any;  
  errmsg: any;  
  loginForm:any;
   succLogin: boolean;
   emptyPSR: boolean;
   emptyUSR: boolean;
   invPass: boolean;
  //userObj = new User;
  constructor(private location: Location,private formbuilder: FormBuilder,private apiservice : APIService, private router:Router) { }  
  ngOnInit() {  
    // if(window.sessionStorage.getItem('userToken')!=null){    
    //   this.router.navigate(['/Add-property']);    
    // }    

    //Login form
    this.loginForm = this.formbuilder.group({   
      USERNAME: ['', [Validators.required]],  
      PASSWORD: ['', [Validators.required]],  
    });

  }     
 
  
OnGetToken(){    
  const user=this.loginForm.controls['USERNAME'].value;    
  const pass=this.loginForm.controls['PASSWORD'].value;    
 this.apiservice.UserAuthentication(user,pass).subscribe((data:any)=>{    
 window.sessionStorage.setItem('userToken',data.access_token);    
 this.router.navigate(['/Add-property']);    
 });    
 } 
 
 clientLogin()
 {
   this.succLogin=false;
   this.emptyPSR=false;
   this.emptyUSR=false;
   this.invPass = false;
   if(this.loginForm.controls['USERNAME'].value=="" && this.loginForm.controls['PASSWORD'].value=="")
   {
     this.emptyPSR=true;
     this.emptyUSR=true;
     return;
   }
   if(this.loginForm.controls['USERNAME'].value=="")
   {
     this.emptyUSR=true;
     return;
   }
   if(this.loginForm.controls['PASSWORD'].value=="")
   {
     this.emptyPSR=true;
     return;
   }
   const login = this.loginForm.value; 
   this.saveInProgress=true;
  //  this.userObj.UserName = this.logUsernameVar;
  //  this.userObj.UserPassword = this.logPasswordVar;
   console.log(JSON.stringify(login));
debugger;
   this.apiservice.LoginClient(login).subscribe(r=> {
     console.log(JSON.stringify(r));
     this.getUserData(r);
   })  


  
  }


  getUserData(data) { 
    if(data.Message=="Invalid User!")
    {
      this.succLogin = true;
      this.saveInProgress=false;
    }else if(data.Message=="Invalid Password!"){
      this.invPass = true;
      this.saveInProgress=false;
    }else{
   

     
      sessionStorage.setItem('EmployeeID',data.EmployeeID);
      sessionStorage.setItem('UserID',data.UserID);
      sessionStorage.setItem('EmployeeTypeID',data.EmployeeTypeID);
      sessionStorage.setItem('EmployeeName',data.EmployeeName);
      sessionStorage.setItem('EmployeeSurname',data.EmployeeSurname);
      sessionStorage.setItem('EmployeeCellNumber',data.EmployeeCellNumber);
      sessionStorage.setItem('EmployeeEmail',data.EmployeeEmail);
      sessionStorage.setItem('EmployeeEmploymentStatus',data.EmployeeEmploymentStatus);
     
      
      sessionStorage.setItem('loggedInStatus','true');
      this.succLogin = false;
      this.emptyPSR = false;
      this.emptyUSR = false;
      this.invPass = false;
      //get client address data
   
      this.router.navigate(['/home']);

      

    }





 }












}  