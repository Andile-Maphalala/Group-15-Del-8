import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-cancelled',
  templateUrl: './payment-cancelled.component.html',
  styleUrls: ['./payment-cancelled.component.css']
})
export class PaymentCancelledComponent implements AfterViewInit {
  @ViewChild('content') content : ElementRef;

  constructor( private _Router : Router,private modalService: NgbModal) { }

  ngAfterViewInit(): void {

    this.success();
  }

  success(){
    this.modalService.open(this.content,{ centered: true });
  }

}
