import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddAgentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
