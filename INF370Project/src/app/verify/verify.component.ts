import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterModule, Routes } from '@angular/router';
//import { GlobalvariablesService } from '../globalvariables.service';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { APIService } from '../Services/api.service';
import { Otp } from '../otp';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  constructor(private modalService: NgbModal,private apiService: ApiService,private router:Router,private gVars:APIService) { }

  enteredOTP="";
  otpObj = new Otp();
  success=false;
  failure=false;
  noOTP=false;
  ngOnInit() {
  }
  @ViewChild('content') content : any;

  checkOTP()
  {
    this.noOTP=false;
    if(this.enteredOTP.length!=6)
    {
      this.noOTP=true;
    }else{
      this.otpObj.addr = this.enteredOTP;
      this.otpObj.cID = parseInt(window.sessionStorage.getItem("clientID"));
      this.apiService.verifyWithOTP(this.otpObj).subscribe(p=>{
        this.getResult(p);
        debugger
      });
    }
    
  }

  getResult(p:any)
  {
    if(p==true)
    {
      this.success=true;
      this.failure=false;
      //this.gVars.setVerified(true);
      sessionStorage.setItem('verified','true');
      this.openWindowCustomClass();

    }else{
      this.failure=true;
    }
  }

  ResendOTP()
  {
    //  this.otpObj.addr = this.enteredOTP;
      this.otpObj.cID = parseInt(window.sessionStorage.getItem("clientID"));
      this.apiService.ResendOTP(this.otpObj).subscribe(p=>{
      //  this.getResult(p);
        debugger
      });
    
    
  }

  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }


}
