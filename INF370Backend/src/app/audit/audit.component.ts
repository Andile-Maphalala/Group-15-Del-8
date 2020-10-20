import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { OnlineLink } from '../Global';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})





export class AuditComponent implements OnInit {
  allAgents: any;
  

  constructor(private httpService: HttpClient) { }
  searchedKeyword: string="";
  old :string ="Old Data:";

  ngOnInit(): void {
   

 this.getAudit();


     

  }

  

        
  getAudit(){

    this.httpService.get(OnlineLink +'Api/User/Audit').subscribe(  
      data => { debugger;
        this.allAgents=data;
        //this.allAgents.OLD=this.old;
   console.log(data);
  
      }  );


    }


}
