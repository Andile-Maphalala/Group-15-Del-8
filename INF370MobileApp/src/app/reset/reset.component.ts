import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { Newpass } from '../newpass';
import { VerifyOTP } from '../verify-otp';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

  constructor(private apiService: ApiService, private router:Router) { }

  otpMatch=false;
  emailResent=false;
  failedOTP=false;
  failedToSend=false;
  newPassSet=false;
  newPassFailed=false;
  usrname="";
  enteredOTP="";
  dataX = new VerifyOTP();
  newP = new Newpass();
  pss1="";
  pss2="";
  firstPanel=true;
  complete=false;
  saveInProgress=false;
  noUsrEntered=false;
  noOTPentered=false;
  noMatch=false;
  userForm:any;

  ngOnInit() {
    this.userForm = new FormGroup({
      Username : new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$")]), 



    })
  }

  requestReset()
  {
    this.noUsrEntered=false;
    if(this.usrname=="")
    {
      this.noUsrEntered=true;
    }else{
      this.saveInProgress=true;
      document.getElementById("overlay").style.display = "block";
      this.apiService.requestPasswordReset(this.usrname).subscribe(x=>{
        this.getResult(x);
      });
    }
  }


  getResult(x:any)
  {
    this.saveInProgress=false;
    document.getElementById("overlay").style.display = "none";
    if(x==true)
    {
      this.emailResent=true;
      this.firstPanel=false;
      this.failedToSend=false;
    }else{
      this.failedToSend=true;
    }
  }



  checkOTP()
  {
    this.noOTPentered=false; 
    if(this.enteredOTP.length!=6)
    {
      this.noOTPentered=true;
    }else{
      this.saveInProgress=true;
      document.getElementById("overlay").style.display = "block";
      this.dataX.otp=this.enteredOTP;
      this.dataX.usrn=this.usrname;
      console.log(this.dataX);
      this.apiService.verifyResetOTP(this.dataX).subscribe(h=>{
        this.getResponse(h);
      });
    }

  }

  getResponse(x:any)
  {
    this.saveInProgress=false;
    document.getElementById("overlay").style.display = "none";
    if(x==true)
    {
      this.otpMatch = true;
      this.emailResent = false;
      this.failedOTP=false;
    }else{
      this.failedOTP = true;
    }
  }







  setNewPass()
  {
    this.noMatch=false;
    this.newPassFailed=false;
    if(this.pss1.length==0 || this.pss2.length==0)
    {
      this.newPassFailed=true;
    }else{
      if(this.pss1!=this.pss2)
    {
      this.noMatch=true;
    }else{
      this.saveInProgress=true;
      document.getElementById("overlay").style.display = "block";
      this.newP.pssw=this.pss1;
      this.newP.usrn=this.usrname;
      this.apiService.setNewPass(this.newP).subscribe(p=>{
        this.getStatus(p);
      });
    }
    }
    
  }

  getStatus(p:any)
  {
    this.saveInProgress=false;
    document.getElementById("overlay").style.display = "none";
    if(p==true)
    {
      this.newPassSet=true;
      this.complete=true;
      this.firstPanel=false;
      this.failedToSend=false;
      this.emailResent=false;
      this.failedOTP=false;
      this.otpMatch=false;
    }else{
      this.newPassFailed=true;
    }
  }













//////////////////////////////////////////////////////////////

}
