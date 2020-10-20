import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import{fromEvent} from 'rxjs'
import{map,filter,debounceTime, distinctUntilChanged,switchMap} from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';
import { ReportingService} from '../Services/Reporting.service'

import Chart from 'chart.js'; 





@Component({
  selector: 'app-overdue-payment-report',
  templateUrl: './overdue-payment-report.component.html',
  styleUrls: ['./overdue-payment-report.component.css']
})
export class OverduePaymentReportComponent implements OnInit {

  constructor(private reports : ReportingService) { }

  Clients : object = null;
  Total : number;
  Username : string;
  
  ngOnInit(): void {
    this.Username = window.sessionStorage.getItem("username");
  }

submitRequest(){
    this.reports.GetOverdueData().subscribe(response =>{

     this.Clients = response["List"]
      this.Total = response["Total"]

    })
  }

  
//   download() {

 
    
//     this.reports.GetOverdueData().subscribe((res: any) => {
//    //var doc = new jsPDF();
//    let doc: any = new jsPDF();
  
//   var pageHeight=doc.internal.pageSize.height||doc.internal.pageSize.getHeight();
//   var pageWidth=doc.internal.pageSize.width||doc.internal.pageSize.getWidth();
  
//   let length=res['List'].length;
//   let value = res["Total"]

  
//   var element = document.getElementById('table')
// //

//   let finalY=160;

  
//   doc.setFontSize(40)
  
//   doc.setFontSize(20)
//   doc.text("Inturbidus Investments (Pty)Ltd",(pageWidth/7)-15,15)
//   doc.setFontSize(10)
//   doc.text("Address: 30 Oaktree Avenue",(pageWidth/4.5)-30,30)
//   doc.setFontSize(10)
//   doc.text("Surbub: Hazelwood",(pageWidth/4.5)-30,40)
//   doc.setFontSize(10)
//   doc.text("City: Pretoria",(pageWidth/4.5)-30,50)
//   doc.setFontSize(10)
//   doc.text("Postal Code: 0028",(pageWidth/4.5)-30,60)
//   doc.setFontSize(15)
//   doc.text("Overdue Payment Report",(pageWidth/3)-15,75)
  
//   var img = new Image()
//   img.src = './assets/Logo.png'
//   doc.addImage(img, 'png', 140, 15, 70, 50)

//   doc.autoTable({startY:finalY-80,html:'#table',useCss:true,head:[['Name','Surname','Phone Number','Email','Reference Number','Amount Due']], pageBreak: 'avoid',})
//   let finaly = doc.autoTable.previous.finalY; // The y position on the page
//   //doc.text(20, finalY, "Hello!")
//   doc.text("Total Overdue Amount: R"+value,(pageWidth/5.2)-25,finaly+5)
//   doc.save('OverduePaymentReport.pdf')
//   })
  
  
//   }

}
