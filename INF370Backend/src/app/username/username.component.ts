import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  names:any;
  constructor() { }

  ngOnInit(): void {
    this.names=sessionStorage.getItem('EmployeeName') +" "+ sessionStorage.getItem('EmployeeSurname') ;

  }

}
