import { Component, OnInit } from '@angular/core';
import { Reporting } from '../reporting';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{map} from 'rxjs/operators';

import Chart from 'chart.js';




import { BookingService } from '../booking.service';
import {  Input, Inject } from '@angular/core';
import { AdminService } from '../admin.service';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-payment-report',
  templateUrl: './client-payment-report.component.html',
  styleUrls: ['./client-payment-report.component.css']
})
export class ClientPaymentReportComponent implements OnInit {
  dateForm: any;  
  reportingClass:Reporting;
  maxDate=new Date();
  maDate: string;
  date: string;

  constructor(private formbuilder: FormBuilder,private report:AdminService){}
  ngOnInit() {  

    this.dateForm = this.formbuilder.group({ 
    startDate: ['', [Validators.required]],  
    endDate: ['', [Validators.required]], 
  } ); 
  const today = new Date();
  var pipe = new DatePipe('en-ZA'); // Use your own locale
  this.date =pipe.transform(today,'yyyy-MM-dd');

    // this.date =pipe.transform(today,'yyyy-MM-dd');


debugger;
  }
  
  checkDates(group: FormGroup) {
    if(group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid:true }
    }
    return null;
  }

  
  
 payments: Object=null ;
  chart=[];
  title = 'angularReport';

  minDate: Date = new Date (1996, 7, 1);
// maxDate: Date = new Date();
//Error Display
error:any={isError:false,errorMessage:''};
// error:any={isError:false,errorMessage:''};

compareTwoDates(){debugger;
   if(new Date(this.dateForm.controls['endDate'].value)<new Date(this.dateForm.controls['startDate'].value)){
      this.error={isError:true,errorMessage:"End Date can't be before start date"};
   }
}
isValidDate:any;

  model : any={};    
  emp:any;  

onSubmit(){
// if(this.chart) this.chart.destroy();
 this.chart=[];
  const date = this.dateForm.value;

  // this.get(date); 

  this.report.getDateDatass(date).subscribe((res: any) => {  debugger;
    console.log(res); 
    
    let keys=res["Properties"].map(d=>d.Name);
    let values=res["Properties"].map(d=>d.Total);
  
    // this.emp=res; 
    this.payments=res["Clients"] ; 
   
    this.chart=new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels: keys,  
        datasets: [  
          {  
            data:values,  
            borderColor: '#3cb371',  
            backgroundColor: "#0000FF",  
          }  
        ]  
      },  
      options: {  
        title: {
          display: true,
          text: 'Total Income Produced by Properties'
      },
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true,
            ticks: {
              beginAtZero: true,
              // max:70000
          }  
          }],  
        }  
      }  
    });  


      
})  
} 

// DownloadPDF()
// {const date = this.dateForm.value;
//   this.report.getDateDatass(date).subscribe((res: any) => {

// let doc: any = new jsPDF();
// var pageHeight=doc.internal.pageSize.height||doc.internal.pageSize.getHeight();
// var pageWidth=doc.internal.pageSize.width||doc.internal.pageSize.getWidth();

// let length=res['Clients'].length;
// let keys=res["Clients"].map(d=>d.Name);
// let values=res["Clients"].map(d=>d.Total);

// let finalY=160;
// var newCanvas=<HTMLCanvasElement>document.querySelector("#canvas");


// var newCanvasImg=newCanvas.toDataURL("images/png",1.0);

// doc.setFontSize(20)
// doc.text("Inturbidus Investments (Pty)Ltd",(pageWidth/7)-15,15)
// doc.setFontSize(10)


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


// var img = new Image()
// img.src = './assets/Logo.png'
// doc.addImage(img, 'png', 140, 15, 70, 50)

// doc.text("Property Income Report",(pageWidth/7)-15,75)
// doc.addImage(newCanvasImg,"PNG",25,80,160,150);
// doc.setFontSize(14)
// for(let i=0;i<length;i++){
// doc.text(keys[i] ,(pageWidth/3)-20,finalY+81)
// doc.autoTable({startY:finalY+82,html:'#test'+i,useCss:true,head:[['PAYMENTID','NAME','SURNAME','PAYMENTDATETIME','ADDRESS']], pageBreak: 'avoid',})





// finalY=doc.autoTable.previous.finalY
// doc.text("                                                Grand Total: R"+values[i],(pageWidth/2)-25,finalY+10)


// }
// doc.save('Client Payments Report.pdf')
// })


// }

// DownloadPDF1(){

//   var data = document.getElementById('data');  //Id of the table
//   html2canvas(data).then(canvas => {  
//     // Few necessary setting options  
  

 
 

//     const contentDataURL = canvas.toDataURL('image/png')  
//     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
//     let position = 0;  
//     var pageHeight=pdf.internal.pageSize.height||pdf.internal.pageSize.getHeight();
//     var pageWidth=pdf.internal.pageSize.width||pdf.internal.pageSize.getWidth();
//     let imgWidth = pdf.internal.pageSize.width||pdf.internal.pageSize.getWidth();  
//     let imgHeight = canvas.height * imgWidth / canvas.width;  
//     let heightLeft = imgHeight;  
//     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
//     pdf.save('MYPdf.pdf'); // Generated PDF   
//   });  

// }


get(date: Reporting){

  this.report.getDateDatass(date).subscribe(  
    () => {  
      this.payments=["Clients"]
  
    }  
  );  
}



}








