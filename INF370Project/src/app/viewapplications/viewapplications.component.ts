import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 
import {Job} from 'src/classes/Jobs';
import { ViewAppService } from 'src/app/view-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-viewapplications',
  templateUrl: './viewapplications.component.html',
  styleUrls: ['./viewapplications.component.css']
})
export class ViewapplicationsComponent implements OnInit {
  allapp: any;  
  appForm: any;
  constructor(private modalService: NgbModal,private formbulider: FormBuilder,private reqService:ViewAppService) { }  

  ngOnInit(): void {
    
    this.appForm = this.formbulider.group({
    })  
    this.loadAllapps();  
  
  }
  loadAllapps() {  
    this.allapp = this.reqService.getapps(Number( window.sessionStorage.getItem("clientID")));  debugger;
  }  

}
