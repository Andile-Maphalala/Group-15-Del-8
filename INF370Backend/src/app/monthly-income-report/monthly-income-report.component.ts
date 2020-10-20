import { Component, OnInit } from '@angular/core';
import { Reporting } from '../reporting';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import{map} from 'rxjs/operators';
import { BookingService } from '../booking.service';
import Chart from 'chart.js';
import {  Input, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-monthly-income-report',
  templateUrl: './monthly-income-report.component.html',
  styleUrls: ['./monthly-income-report.component.css']
})
 
export class MonthlyIncomeReportComponent implements OnInit {
  dateForm: any;  
  reportingClass:Reporting;
  map:any;
  date: string;
  date1: string;
  date30: string;

 
  constructor(private formbuilder: FormBuilder,private report:BookingService) { }

  ngOnInit(): void {
    debugger;

    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.date =pipe.transform(today,'yyyy-MM-dd');
    this.date1 =pipe.transform(today,'yyyy-MM-dd');
    const days = new Date(today)
var format=days.setDate(days.getDate() - 30)
this.date30 =pipe.transform(format,'yyyy-MM-dd')
    this.dateForm = this.formbuilder.group({ 
      startDate: [new Date(this.date30), [Validators.required]],  
      endDate: [new Date(this.date1), [Validators.required]], 
    }); 
 
console.log(this.date1);
console.log(this.date);

  }

  PAYMENTs: any ;
  SUMs:any;
  chart=[];
  title = 'angularReport';

// minDate: Date = new Date ();
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

  

  this.report.getDateData(date).subscribe((res: any) => {  
    
    console.log(res); 
    
    
    this.PAYMENTs=res["Payment"] ; 
    this.SUMs=res["Sum"] ; 
    debugger;




  })}

  // DownloadPDF()
  // {
    
  //   const date = this.dateForm.value;
  //   this.report.getDateData(date).subscribe((res: any) => {
 
  //     let doc: any = new jsPDF();
  // var pageHeight=doc.internal.pageSize.height||doc.internal.pageSize.getHeight();
  //  var pageWidth=doc.internal.pageSize.width||doc.internal.pageSize.getWidth();
  
  //  let length=res["Payment"].length;
  // // let keys=res["Payment"].map(d=>d.Date);debugger;
   
  //  let values=res["Sum"];
  
  // let finalY=160;
  // var newCanvas=<HTMLCanvasElement>document.querySelector("#canvas");
  
  // var newCanvasImg=newCanvas.toDataURL("images/png",1.0);
  // doc.setFontSize(20)
  // doc.text("Inturbidus Investments Pty(Ltd)",(pageWidth/7)-15,15)
  // doc.setFontSize(10)
  // doc.text("Address: 30 Oaktree Avenue",(pageWidth/4.5)-30,30)
  // doc.setFontSize(10)
  // doc.text("Surbub: Hazelwood",(pageWidth/4.5)-30,40)
  // doc.setFontSize(10)
  // doc.text("City: Pretoria",(pageWidth/4.5)-30,50)
  // doc.setFontSize(10)
  // doc.text("Postal Code: 0028",(pageWidth/4.5)-30,60)
  // doc.setFontSize(15)
  // doc.text("Total Monthly Income Report",(pageWidth/3)-15,75)
  // doc.addImage(newCanvasImg,"PNG",25,25,160,150);
  // doc.setFontSize(14)
  // var img = new Image()
  // img.src = './assets/Logo.png'
  // doc.addImage(img, 'png', 140, 15, 70, 50)
  // //doc.text(keys ,(pageWidth/2)-25,finalY+23)
  // doc.autoTable({startY:finalY-80,html:'#test',useCss:true,head:[['Date','Reference','Amount']], pageBreak: 'avoid',})
  //  finalY=doc.autoTable.previous.finalY
  // doc.text("Total Income: R"+values,(pageWidth/5.2)-25,finalY+10)
  
  
  
  // doc.save('Total Monthly Income Report.pdf')
  // })
  
  
  // }
  
 
} 