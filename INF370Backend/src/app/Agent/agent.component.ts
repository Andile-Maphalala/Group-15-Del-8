import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
