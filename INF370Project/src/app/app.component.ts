import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutologoutService } from './autologout.service';
//import {material} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'INF370Project';
  href: any;

  constructor(  private autoLogout: AutologoutService,
    public http: HttpClient
  ) {}
  // throw new Error('Required'); 
  ngOnInit() {

}
 
}


