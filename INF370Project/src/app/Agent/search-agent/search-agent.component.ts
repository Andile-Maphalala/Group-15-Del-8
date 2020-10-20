import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-agent',
  templateUrl: './search-agent.component.html',
  styleUrls: ['./search-agent.component.css']

})
export class SearchAgentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  
}
