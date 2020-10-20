import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.css']

})
export class AssignAgentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

}
