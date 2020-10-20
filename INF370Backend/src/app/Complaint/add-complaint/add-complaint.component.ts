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
  
  constructor(private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }






complaintForm = new FormGroup({
    Details : new FormControl(this.complaint.Details, Validators.required),
    Photo : new FormControl(this.complaint.Photo, Validators.required),
    UserID : new FormControl(this.complaint.UserID),


    
  })

  ID : number
  Username : string;
  
  ngOnInit(): void {
    //window.sessionStorage.setItem("UserID","2");
     this.ID = parseInt(window.sessionStorage.getItem("UserID"))
     this.complaint.UserID = this.ID;
     this.Username = window.sessionStorage.getItem("username");
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
    this.complaint.UserID =  this.ID;
    this.complaint = this.complaintForm.value;
    this.complaint.RentalID = 2;
    //this.complaint.Photo = this.fileToUpload.name;
    //this.complaintservice.AddComplaint(this.complaint);
    this.complaintservice.postFile(this.complaint,this.fileToUpload).subscribe(
      data =>{
        console.log('done');
        
      this.imageUrl = "/assets/img/default-image.jpeg";
      });
      
    

      //  this.complaintForm.reset();  
      //  this.imageUrl = "";

       
    }

}

