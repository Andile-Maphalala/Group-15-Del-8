import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.css']
})
export class UpdateComplaintComponent implements OnInit {


  complaint  = new Complaint();
  fileToUpload: File = null;
  products : any = [];
  image: any;
  imageUrl : any;
  complaints: any = []; 
  showImage = false;
  reader = new FileReader();
  Username : string;
  complaintID : number;
  userID : number;

  constructor(private route : ActivatedRoute, private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }


  complaintForm = new FormGroup({
    Details : new FormControl(this.complaint.Details, Validators.required),
    Photo : new FormControl(this.complaint.Photo, Validators.required),
    UserID : new FormControl(this.complaint.UserID, Validators.required),
    ComplaintID :  new FormControl(this.complaint.ComplaintID, Validators.required),


    
  })

  ngOnInit(): void {

    

    this.Username = window.sessionStorage.getItem("username");
    this.complaintID = parseInt(window.sessionStorage.getItem("ComplaintID"));
    this.userID = parseInt(window.sessionStorage.getItem("UserID"))
    
    this.getComplaint(this.complaintID);
  }

  getComplaint(ID : number){
    this.complaintservice.getComplaintById(ID).subscribe(
    (com : Complaint) => this.editComplaint(com),
    (err: any) => console.log(err)
    ),
    this.complaintservice.getComplaintById(ID).subscribe(
    (com : Complaint) => this.assignProduct(com));
   
    this.imageUrl = this.complaint.Photo;
  }
  
  editComplaint(complaint : Complaint){
    this.complaintForm.patchValue({
      Details : complaint.Details,
      //Photo: complaint.Photo,
      UserID: complaint.UserID,

    
    })
    
  }
  
  assignProduct(com : Complaint){
   
    this.complaint.Details = com.Details,
    this.complaint.Photo = com.Photo,
    this.complaint.ComplaintID = com.ComplaintID;
    this.LoadFile
    }
  
    LoadFile(file: FileList) {
      
      this.fileToUpload = file.item(0);
    }

    handleFileInput(file: FileList) {
    
      this.fileToUpload = file.item(0);
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.complaint.Photo = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }

    OnSubmit(){
      this.complaint = this.complaintForm.value;
      this.complaint.ComplaintID = this.complaintID;
      this.complaint.UserID = this.userID;
      if ( this.fileToUpload == undefined)
      {
        this.complaint.Photo = this.complaint.Photo;
        this.complaintservice.UpdateFileOFOldImage(this.complaint,this.fileToUpload).subscribe(
          data =>{
            console.log('done');
            //Image.value = null;
          this.imageUrl = "/assets/img/default-image.jpeg";
          });
      
        
      
          window.alert("Successfully updated details");
          this._Router.navigate(['search-complaint'])
          //Image.value = null;
      }
      
      else{
        this.complaint = this.complaintForm.value;
        this.complaint.ComplaintID = this.complaintID;
        this.complaint.UserID = this.complaint.UserID;
        this.complaintservice.UpdateFile(this.complaint,this.fileToUpload).subscribe(
          data =>{
            console.log('done');
            //Image.value = null;
          this.imageUrl = "/assets/img/default-image.jpeg";
          });
          
          window.alert("Successfully updated details");
          this._Router.navigate(['search-complaint']);
        
        }
      }
    

}
