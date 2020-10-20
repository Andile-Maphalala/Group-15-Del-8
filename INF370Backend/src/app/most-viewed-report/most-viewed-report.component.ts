import { Component, OnInit } from '@angular/core';
import { ReportingService} from '../Services/Reporting.service'
import {Chart} from 'Chart.js'
import { from } from 'rxjs';
import{ mergeMap, groupBy, map,reduce} from 'rxjs/operators'
import {MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-most-viewed-report',
  templateUrl: './most-viewed-report.component.html',
  styleUrls: ['./most-viewed-report.component.css']
})
export class MostViewedReportComponent implements OnInit {
  data: boolean=false;
  dateForm: any;
  date: string;

  constructor(private reports : ReportingService,private formbuilder: FormBuilder) { }
  Username : string;

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({ 
      startDate: ['', [Validators.required]],  
      endDate: ['', [Validators.required]], 
    } ); 
    const today = new Date();
    var pipe = new DatePipe('en-ZA'); // Use your own locale
    this.date =pipe.transform(today,'yyyy-MM-dd');
  
    this.Username = window.sessionStorage.getItem("username");
  }


  checkDates(group: FormGroup) {
    if(group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid:true }
    }
    return null;
  }


  minDate: Date = new Date (1996, 7, 1);
  error:any={isError:false,errorMessage:''};


  compareTwoDates(){
    if(new Date(this.dateForm.controls['endDate'].value)<new Date(this.dateForm.controls['startDate'].value)){
       this.error={isError:true,errorMessage:"End Date can't be before start date"};
    }
 }

 isValidDate:any;

 model : any={};    
 emp:any;  

 onSubmit(){ debugger;
  const date = this.dateForm.value;

  this.reports.GetMostViewedData(date).subscribe(data =>{debugger;
 

       let values = data["List"].map(z=> z.Count);
    let keys = data["List"].map(z=> z.Name);
    

  
     var chart  = new Chart('canvas', {
      type: 'bar',
      data: {
          labels: keys,
          datasets: [{
              label: 'Number of times rented for each property type',
              data: values,
              barPercentage: 0.75,
              backgroundColor: 
                  'rgba(0, 181, 204, 1)',
              
              
              borderColor: 
                  'rgba(36, 37, 42, 1)',
              
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          labels :{
            fontColor: 'Black',
            fontSize : 20
          }
        },
          scales: {
              yAxes: [{
                
                  ticks: {
                    fontColor: 'Black',
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                
                ticks: {
                  fontColor: 'Black',
                  fontSize : 15
                    
                }
            }]
          }
      }
  });


  })

 }


  // download() {

  //   // const doc = new jsPDF();

  //   // doc.text("Most View Property", 10, 20);
  //   // doc.save("MostViewedProperty.pdf"); 

    
  //   this.reports.GetMostViewedData().subscribe((res: any) => {
  // var doc = new jsPDF();
  
  // var pageHeight=doc.internal.pageSize.height||doc.internal.pageSize.getHeight();
  // var pageWidth=doc.internal.pageSize.width||doc.internal.pageSize.getWidth();
  
  // let length=res['List'].length;
  // let values = res["List"].map(z=> z.Visited);
  // let keys = res["List"].map(z=> z.Name);
  
  // let finalY=160;
  // var newCanvas=<HTMLCanvasElement>document.querySelector("#canvas");
  
  
  // var newCanvasImg=newCanvas.toDataURL("images/png",1.0);
  
  
  // doc.setFontSize(20)
  // doc.text("Inturbidus Investments (Pty)Ltd",(pageWidth/7)-15,15)
  // doc.setFontSize(10)
  // doc.text("Address: 30 Oaktree Avenue",(pageWidth/4.5)-30,30)
  // doc.setFontSize(10)
  // doc.text("Surbub: Hazelwood",(pageWidth/4.5)-30,40)
  // doc.setFontSize(10)
  // doc.text("City: Pretoria",(pageWidth/4.5)-30,50)
  // doc.setFontSize(10)
  // doc.text("Postal Code: 0028",(pageWidth/4.5)-30,60)
  // doc.setFontSize(15)
  // doc.text("Most Viewed Property Report",(pageWidth/3)-15,75)
  
  // var img = new Image()
  // img.src = './assets/Logo.png'
  // doc.addImage(img, 'png', 140, 15, 70, 50)
  
  // doc.addImage(newCanvasImg,"PNG",25,80,160,150);
  // doc.setFontSize(14)
  // // for(let i=0;i<length;i++){
  // // doc.text(keys[i] ,(pageWidth/2)-25,finalY+23)
  
  
  // // }
  // doc.save('MostViewedProperty.pdf')
  // })
  
  
  // }



  chart = []
  Properties : object = null;

  // submitRequest(){


  //   this.reports.GetMostViewedData().subscribe(response =>{
  //      console.log(response);

  //      this.data=true;

  //      let values = response["List"].map(z=> z.Visited);
  //   let keys = response["List"].map(z=> z.Name);
    

  
  //    var chart  = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //         labels: keys,
  //         datasets: [{
  //             label: 'Number of viewed times for each property type',
  //             data: values,
  //             barPercentage: 0.75,
  //             backgroundColor: 
  //                 'rgba(0, 181, 204, 1)',
              
              
  //             borderColor: 
  //                 'rgba(36, 37, 42, 1)',
              
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       legend: {
  //         labels :{
  //           fontColor: 'Black',
  //           fontSize : 20
  //         }
  //       },
  //         scales: {
  //             yAxes: [{
                
  //                 ticks: {
  //                   fontColor: 'Black',
  //                     beginAtZero: true
  //                 }
  //             }],
  //             xAxes: [{
                
  //               ticks: {
  //                 fontColor: 'Black',
  //                 fontSize : 15
                    
  //               }
  //           }]
  //         }
  //     }
  // });
  
  //   })
  // }
}
