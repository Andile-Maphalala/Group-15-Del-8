import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { DisplayUser } from 'src/app/Classes/DisplayUser';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


interface User {
  value: string;
  viewValue: string;
}


export class TableBasicExample {
  displayedColumns: string[] = [ 'Name', 'Surname','Phone Number','Email','Username'];
}

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  encapsulation: ViewEncapsulation.None

})



  // export class SelectOverviewExample {
  //   users: User[] = [
  //     {value: '0', viewValue: 'ID'},
  //     {value: '1', viewValue: 'Username'},
  //     {value: '2', viewValue: 'Type'}
  //   ];
  // }
export class SearchUserComponent implements OnInit {

  searchedKeyword: string;

  constructor(private _Router : Router ,private formbulider: FormBuilder,private userservice:UserService) {  }

  ngOnInit(): void {
    this.loadAllUsers();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
allUsers : Observable<DisplayUser[]>;
Users : DisplayUser[];

loadAllUsers() {  
  this.allUsers = this.userservice.getAllUser(); 


}
  

}
