import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentEmployee: any;
  
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
