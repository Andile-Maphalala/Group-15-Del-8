import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  currentEmployee: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('EmployeeTypeID') == "9") {//admin

      this.currentEmployee="admin";
   
   }
   
   else if (sessionStorage.getItem('EmployeeTypeID') == "1") { //owner

     this.currentEmployee="owner";
   
   }
   
   else if (sessionStorage.getItem('EmployeeTypeID') == "3") { //maintenance

     this.currentEmployee="maintenance";
   
   }

  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);

  }

}
