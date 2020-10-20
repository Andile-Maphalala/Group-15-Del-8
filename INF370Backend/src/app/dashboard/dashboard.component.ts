import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportingService} from '../Services/Reporting.service'
import {Chart} from 'Chart.js'
import { from } from 'rxjs';
import{ mergeMap, groupBy, map,reduce} from 'rxjs/operators'
import {MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';
// import { jsPDF } from "jspdf";
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../Services/Dashboard.service';
import { Data } from '@angular/router';
import { OnlineLink } from '../Global';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

TotalIncome : number;

Expense :  any;
Unrented : number;
Rented : number;
Archived : number;
JobLink : any;

@ViewChild('canvas') canvas: ElementRef;

  constructor(private http : HttpClient,private report:Dashboard, private elementRef: ElementRef) { }

  ngOnInit(): void {
this.JobLink= OnlineLink+'jobs/recurring'

    this.report.GetIncome().subscribe(data => {
    this.TotalIncome = Number(data);
    })

    //////////////////////////////////////////////////////////////////////

this.GetProperties();
this.GetExpense();
this.GetJobs();
  }

  
 
  chart = []
  barchart = []
  Piechart = []
GetProperties(){

  this.report.GetProperty().subscribe(data => {

  this.Unrented = data["Unrented"]; 
  this.Rented = data["Rented"];
  this.Archived = data["Archived"];


     var chart  = new Chart('canvas', {
      type: 'doughnut',
      data: {
          labels: [
            'Available',
            'Rented',
            'Archived'
        ],

          datasets: [{
              data :[this.Unrented, this.Rented, this.Archived],
           
              backgroundColor: ["#0000F5","#0FFF00","#FE0000"],
              borderColor: 
                  'rgba(36, 37, 42, 1)',
              
              borderWidth: 1

          }],
         
      },
       options: { 
        animation: {
          duration: 2500,
          easing: 'easeOutBounce',
          
          
        },
        elements:{
          center: {
            text: 'Text',
          }
        },
        title: {
          display: true,
          text: 'Property Statuses',
          fontSize : 30,
          fontColor : '#060709'
      },
        legend: {
      display: true,

  
  }
}
      
  });




//////////////////////////////////////////////
  })

}


mykeys : any;
myvalues : any;
GetExpense()
{
  this.report.GetExpense().subscribe(data => { 

    this.Expense =  data;

    

let values = data["List"].map(z=> z.SUM);debugger;
let keys = data["List"].map(z=> z.MONTH);



    var barchart  = new Chart('bargraph', {
      type: 'bar',
      data: {
          labels: keys,
          datasets: [{
              label: 'Total Maintenance Expense For Each Month',
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
        animation: {
          duration: 2500,
          easing: 'easeOutBounce',
          
          
        },
        elements: {
          center: {
            text: 'Red is 2/3 of the total numbers',
            color: '#FF6384', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25 // Default is 25 (in px), used for when text wraps
          }
        }
      ,
        legend: {
          labels :{
            fontColor: 'Black',
            fontSize : 20,
            display: true,
          }
        },
        responsive: true,
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




/////////
  })
}


GetJobs(){

this.report.GetJobs().subscribe(data => {



  var Piechart = new Chart('pieChart', {
    type: 'pie',
    data: {
        labels: [
          'Unassigned',
          'Assigned',
          'Completed'
      ],

        datasets: [{
            data :[data["Unassigned"], data["Assigned"], data["Completed"]],
         
            backgroundColor: ["#FE0000","#0000F5","#0FFF00"],
            borderColor: 
                'rgba(36, 37, 42, 1)',
            
            borderWidth: 1

        }],
       
    },
     options: { 
      animation: {
        duration: 2500,
        easing: 'easeOutBounce',

      },
 
      elements:{
        center: {
          text: 'Text',
        }
      },
      title: {
        display: true,
        text: 'Monthly Job Progress',
        fontSize : 30,
        fontColor : '#060709',
        
    },
      legend: {
    display: true,


}
}
    
});
})

}


  //////////////////////////////////////////////////////////////////////////

}
