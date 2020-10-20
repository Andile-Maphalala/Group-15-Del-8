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
   
  successmsg: any;  
  errmsg: any;  
  loginForm:any;
   succLogin: boolean;
   emptyPSR: boolean;
   emptyUSR: boolean;
   invPass: boolean;
   saveInProgress: boolean=false;
   href: string;
  //userObj = new User;
  constructor( private _Router : Router,private location: Location,private formbuilder: FormBuilder,private apiservice : APIService, private router:Router) { }  
  ngOnInit() {  
   
    // if(window.sessionStorage.getItem('userToken')!=null){    
    //   this.router.navigate(['/Add-property']);    
    // }    
debugger;
    if(Boolean(sessionStorage.getItem('loggedInStatus'))==true)
    { 
    
              this._Router.navigate(['/']);
    
    }
    else{



    }
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
   

     
      sessionStorage.setItem('clientCell',data.ClientCellNumber);
      sessionStorage.setItem('clientEmail',data.ClientEmail);
      sessionStorage.setItem('clientID',data.ClientID);
      sessionStorage.setItem('clientName',data.ClientName);
      sessionStorage.setItem('clientSurname',data.ClientSurname);
      sessionStorage.setItem('userID',data.UserID);
      sessionStorage.setItem('username',data.username);
      sessionStorage.setItem('hasApplied',data.hasApplied);
      sessionStorage.setItem('DOB',data.DOB);
      sessionStorage.setItem('verified',data.verified);
debugger;
      
      sessionStorage.setItem('loggedInStatus','true');
      this.succLogin = false;
      this.emptyPSR = false;
      this.emptyUSR = false;
      this.invPass = false;
      //get client address data
   
      this.router.navigate(['/']);

      

    }





 }












}  