import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ComplaintRental } from 'src/app/Classes/ComplaintRental';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  clientID : number;
  rentals : Observable<ComplaintRental[]>
  @ViewChild('content') content : any;

  constructor(private modalService: NgbModal,private route : ActivatedRoute, private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }

  ngOnInit(): void {


    this.Username = window.sessionStorage.getItem("username");
    this.complaintID = parseInt(window.sessionStorage.getItem("ComplaintID"));
    this.clientID = parseInt(window.sessionStorage.getItem("clientID"));

    this.GetRentals();
    this.getComplaint(this.complaintID);
  }
  openWindowCustomClass() {
    this.modalService.open(this.content,{ centered: true });
  }
  complaintForm = new FormGroup({
    Details : new FormControl(this.complaint.Details, Validators.required),
    Photo : new FormControl(this.complaint.Photo, Validators.required),
    RentalID : new FormControl(this.complaint.RentalID, Validators.required),


    
  })

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
      RentalID: complaint.RentalID,

    
    })
    
  }


  assignProduct(com : Complaint){
   
    this.complaint.Details = com.Details,
    this.complaint.Photo = com.Photo,
    this.complaint.ComplaintID = com.ComplaintID;
    this.complaint.RentalID = com.RentalID;
    console.log(this.complaint)
    this.LoadFile
    }

    GetRentals()
    {
      this.rentals = this.complaintservice.getRentals(this.clientID);
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
      console.log(this.complaintForm.value)
      console.log( this.complaint)
      this.complaint.ComplaintID = this.complaintID;
      this.complaint.ClientID = this.clientID;
      if ( this.fileToUpload == undefined)
      {
        this.complaint.Photo = this.complaint.Photo;
        this.complaintservice.UpdateFileOFOldImage(this.complaint,this.fileToUpload).subscribe(
          data =>{
            console.log('done');
            //Image.value = null;
            this.complaintForm.reset();
            // this._Router.navigate(['search-complaint']);

            this.openWindowCustomClass();
            // document.getElementById("openModalButton").click();
          });
      
        
      
          // window.alert("Successfully updated details");
          //this._Router.navigate(['search-complaint'])
          //Image.value = null;
       }
      
      else{
        this.complaint = this.complaintForm.value;
        this.complaint.ComplaintID = this.complaintID;
        this.complaint.ClientID = this.complaint.ClientID;
        this.complaintservice.UpdateFile(this.complaint,this.fileToUpload).subscribe(
          data =>{
            console.log('done');
            //Image.value = null;
            this.complaintForm.reset();
            // this._Router.navigate(['search-complaint']);

            this.openWindowCustomClass();
            // document.getElementById("openModalButton").click();
          });
          
          // window.alert("Successfully updated details");
          //this._Router.navigate(['search-complaint']);
        
        }
      }

}
