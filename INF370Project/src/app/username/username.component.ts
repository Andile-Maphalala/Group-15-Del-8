import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  names: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.names=sessionStorage.getItem('clientName') +" "+ sessionStorage.getItem('clientSurname') ;
    if (sessionStorage.getItem('clientID') == null) {
      this.router.navigate(['/login']);
    }
  }

}
