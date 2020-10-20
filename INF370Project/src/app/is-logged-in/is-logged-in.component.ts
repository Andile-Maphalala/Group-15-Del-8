import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-is-logged-in',
  templateUrl: './is-logged-in.component.html',
  styleUrls: ['./is-logged-in.component.css']
})
export class IsLoggedInComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('clientID') == null) {
      this.router.navigate(['/login']);
    }
  }

}
