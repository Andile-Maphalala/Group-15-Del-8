import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ComplaintRental } from 'src/app/Classes/ComplaintRental';
import {Observable} from 'rxjs/observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

  complaint  = new Complaint();
  fileToUpload: File = null;
  products : any = [];
  image: any;
  imageUrl : any;
  complaints: any = []; 
  showImage = false;
  reader = new FileReader();

  rentals : Observable<ComplaintRental[]>
  @ViewChild('content') content : any;

  constructor(private modalService: NgbModal,private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }



  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }


complaintForm = new FormGroup({
    Details : new FormControl(this.complaint.Details, Validators.required),
    Photo : new FormControl(this.complaint.Photo,),
    RentalID : new FormControl(this.complaint.RentalID, Validators.required),


    
  })

  ID : number
  clientID : number;
  Username : string;
  complaintID : number;

  
  ngOnInit(): void {
    // window.sessionStorage.setItem("clientID","6");
     //this.ID = parseInt(window.sessionStorage.getItem("UserID"))
    // this.complaint.ClientID = this.ID;
     this.clientID = parseInt(window.sessionStorage.getItem("clientID"))
     this.Username = window.sessionStorage.getItem("username");
     this.complaintID = parseInt(window.sessionStorage.getItem("ComplaintID"));
     
     this.GetRentals();
  }


  GetRentals()
  {
    this.rentals = this.complaintservice.getRentals(this.clientID);
   
  }

  handleFileInput(file: FileList) {
    
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  

  OnSubmit(){
    
    this.complaint = this.complaintForm.value;
    this.complaint.ClientID =  this.clientID;
   // this.complaint.ClientID = this.complaintID
debugger;
    if(this.fileToUpload!=null)
    {
      this.complaint.Photo = this.fileToUpload.name;
      this.complaintservice.postFile(this.complaint,this.fileToUpload).subscribe(
        data =>{
          console.log('done');
          
        this.complaintForm.reset();
        this.openWindowCustomClass();
        });
    }
    else{
   
      this.fileToUpload=null;
      this.complaintservice.postFileNoPhoto(this.complaint).subscribe(
        data =>{
          console.log('done');
          
        this.complaintForm.reset();
        this.openWindowCustomClass();
        });
    }
    console.log(this.fileToUpload);
   
      
    

      //  this.complaintForm.reset();  
      //  this.imageUrl = "";

       
    }

}

