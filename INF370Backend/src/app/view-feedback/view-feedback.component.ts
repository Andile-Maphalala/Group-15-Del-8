import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnlineLink } from '../Global';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {

  constructor(private httpService: HttpClient) { }  
  FEEDBACKs: string[];  
  ngOnInit() {  
    this.httpService.get(OnlineLink+'Api/ViewFeedback/GetFeedbackComments').subscribe(  
      data => {  
       this.FEEDBACKs = data as string [];  
      }  
    );  
  }  
  
}  