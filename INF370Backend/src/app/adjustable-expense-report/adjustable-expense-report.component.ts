import { Component, OnInit } from '@angular/core';
import { Reporting } from '../reporting';
import { FormBuilder, Validators } from '@angular/forms';
import{map} from 'rxjs/operators';
//import  'jspdf';
//import * as jsPDF from 'jspdf'
//import 'jspdf-autotable';
import { BookingService } from '../booking.service';
import Chart from 'chart.js';
//import 'jspdf-autotable';
import {  Input, Inject } from '@angular/core';
import { AdminService } from '../admin.service';
//import jsPDF from 'jspdf'


import { DatePipe } from '@angular/common';
 //declare var jsPDF: any;

@Component({
  selector: 'app-adjustable-expense-report',
  templateUrl: './adjustable-expense-report.component.html',
  styleUrls: ['./adjustable-expense-report.component.css']
})
export class AdjustableExpenseReportComponent implements OnInit {

  dateForm: any;  
  reportingClass:Reporting;
  map:any;
  date: string;

 
  constructor(private formbuilder: FormBuilder,private report:AdminService) { }

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({ 
      startDate: ['', [Validators.required]],  
      endDate: ['', [Validators.required]], 
    }); 
    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.date =pipe.transform(today,'yyyy-MM-dd');
  }

  PAYMENTs: any ;
  SUMs:any;
  chart=[];
  title = 'angularReport';

minDate: Date = new Date ();
maxDate: Date = new Date ();
//Error Display
error:any={isError:false,errorMessage:''};
isValidDate:any;

  model : any={};    
  emp:any;  

onSubmit(){
// if(this.chart) this.chart.destroy();
debugger;
 this.chart=[];
  const date = this.dateForm.value;

  

  this.report.getDateDatas(date).subscribe((res: any) => {  
    
    console.log(res); 
    
    
    this.PAYMENTs=res["Payment"] ; 
    this.SUMs=res["Sums"] ; 
    debugger;




  })}

  // DownloadPDF()
  // {
    
  // const date = this.dateForm.value;
  //   this.report.getDateDatas(date).subscribe((res: any) => {
 
  //     //var doc =new jsPDF();debugger;
  //     let doc: any = new jsPDF();
  // var pageHeight=doc.internal.pageSize.height||doc.internal.pageSize.getHeight();
  //  var pageWidth=doc.internal.pageSize.width||doc.internal.pageSize.getWidth();
  
  //  let length=res["Payment"].length;
  // // let keys=res["Payment"].map(d=>d.Date);debugger;
   
  //  let values=res["Sums"];
  
  // let finalY=160;
  // var newCanvas=<HTMLCanvasElement>document.querySelector("#canvas");
  
  // var newCanvasImg=newCanvas.toDataURL("images/png",1.0);
  
  // doc.setFontSize(20)
  
 
  // doc.text("Inturbidus Investments (Pty)Ltd",(pageWidth/7)-15,15)
  // doc.setFontSize(10)
 
  // doc.addImage(newCanvasImg,"PNG",25,25,160,150);
  // doc.setFontSize(14)
  // doc.setFontSize(20)
  // doc.text("Address: 30 Oaktree Avenue",(pageWidth/4.5)-30,30)
  // doc.setFontSize(10)
  // doc.text("Surbub: Hazelwood",(pageWidth/4.5)-30,40)
  // doc.setFontSize(10)
  // doc.text("City: Pretoria",(pageWidth/4.5)-30,50)
  // doc.setFontSize(10)
  // doc.text("Postal Code: 0028",(pageWidth/4.5)-30,60)
  // doc.setFontSize(15)
  // doc.text("Expense Report",(pageWidth/3)-15,75)
  
  // var img = new Image()
  // img.src = './assets/Logo.png'
  // doc.addImage(img, 'png', 140, 15, 70, 50)

  // //doc.text(keys ,(pageWidth/2)-25,finalY+23)
  // doc.autoTable({startY:finalY-80,html:'#test',useCss:true,head:[['Name','DESCRIPTION','QUANTITY','QUANTITY']], pageBreak: 'avoid',})
  //  finalY=doc.autoTable.previous.finalY
  // doc.text("Total Expense  : R"+values,(pageWidth/2)-25,finalY+10)
  
  
  
  // doc.save('TotalExpense   Report.pdf')
  // })
  
  
  // }
  
 
} 