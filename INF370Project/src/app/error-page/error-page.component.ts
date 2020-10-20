import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements AfterViewInit {
  myError: any;

  constructor(private _Router : Router,private modalService: NgbModal,private api:ApiService) { }

  ngAfterViewInit(): void {
    this.Error();
    this.myError=this.api.myError;
  }
  @ViewChild('content') content : ElementRef;


  Error(){debugger;

    this.modalService.open(this.content,{ centered: true });
  
  
  }


}
