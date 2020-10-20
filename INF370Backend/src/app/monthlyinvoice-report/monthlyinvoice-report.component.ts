import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { Reporting } from '../reporting';

import{map} from 'rxjs/operators';


import {  Input, Inject } from '@angular/core';
//  declare var jsPDF: any;
@Component({
  selector: 'app-monthlyinvoice-report',
  templateUrl: './monthlyinvoice-report.component.html',
  styleUrls: ['./monthlyinvoice-report.component.css']
})
export class MonthlyinvoiceReportComponent implements OnInit {
  dateForm: any;  
  reportingClass:Reporting;
  map:any;

 
  constructor(private formbuilder: FormBuilder,private report:BookingService) { }

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({ 
      startDate: ['', [Validators.required]],  
      endDate: ['', [Validators.required]], 
    }); 
    
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

  

  this.report.getDateData1(date).subscribe((res: any) => {  
    
    console.log(res); 
    
    
    this.PAYMENTs=res["Payment"] ; 
    this.SUMs=res["Sum"] ; 
    debugger;




  })}

  // DownloadPDF()
  // {
    
  //   const date = this.dateForm.value;
  //   this.report.getDateData1(date).subscribe((res: any) => {
 
  //     // var doc =new jsPDF();debugger;
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
  // doc.text("Monthly Invoice Report",(pageWidth/3)-15,75)
  // doc.addImage(newCanvasImg,"PNG",25,25,160,150);
  // doc.setFontSize(14)
  // var img = new Image()
  // img.src = './assets/Logo.png'
  // doc.addImage(img, 'png', 140, 15, 70, 50)
  // //doc.text(keys ,(pageWidth/2)-25,finalY+23)
  // doc.autoTable({startY:finalY-80,html:'#test',useCss:true,head:[['Date','Reference','Amount','PaymentType']], pageBreak: 'avoid',})
  //  finalY=doc.autoTable.previous.finalY
  
  
  
  
  // doc.save(' Monthly Invoice Report.pdf')
  // })
  
  
  // }
  
 
} 