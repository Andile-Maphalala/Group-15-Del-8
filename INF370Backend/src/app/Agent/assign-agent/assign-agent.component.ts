import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Agent } from 'src/app/Classes/Agent';
//import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { AgentService } from 'src/app/Services/Agent.service';
import { Injectable } from '@angular/core';
import { Property } from 'src/app/Classes/Property';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.css']

})
export class AssignAgentComponent implements OnInit {

  constructor(private _Router : Router ,private formbulider: FormBuilder,private agentservice:AgentService) { }

  ngOnInit(): void {
    this.loadAllproperties();
  }

  searchedKeyword: string;

  allproperties : Observable<Property[]>;
  property = new Property();
  
  loadAllproperties() {  
    this.allproperties = this.agentservice.getAllProperty()
  
  }

  OpenModal(PropID : number){
    
  }

  assignAgent(PropID : number){
    //this.property = this.allproperties.
    
    this.property.PROPERTYID = PropID;
    this.property.AGENT_ID = parseInt(window.sessionStorage.getItem("AgentID"));
    
    this.agentservice.AssignAgent(this.property).subscribe(() =>{

      document.getElementById("openModalButton").click();
    });

  }

  Go(){
    this._Router.navigate(['search-agent']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

}
