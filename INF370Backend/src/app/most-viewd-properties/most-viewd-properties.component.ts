import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-viewd-properties',
  templateUrl: './most-viewd-properties.component.html',
  styleUrls: ['./most-viewd-properties.component.css']
})
export class MostViewdPropertiesComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}

