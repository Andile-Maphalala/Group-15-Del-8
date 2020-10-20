import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent} from "daypilot-pro-angular";
import {DataService} from "src/app/Services/data.service";

@Component({

 selector: 'schedule-component',
 template: `<daypilot-calendar [config]="config" [events]="events" #timetable></daypilot-calendar>
  <div class="space">
    
  <div *ngFor="let item of rawData">{{item}}</div>
  </div>
  `,
  styles: [`    
    :host ::ng-deep .calendar_default_rowheader_inner {
      text-align: left;
      padding: 5px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    
    :host ::ng-deep .calendar_default_colheader_inner {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  `]
})
export class ScheduleComponent implements AfterViewInit {

  @ViewChild("timetable") timetable: DayPilotCalendarComponent;

  events: any[] = [];

  blocks: any[] = [
    {name: "Move in inspection"},
    {name: "Move in inspection"},
    {name: "Move out inspection"},
    {name: "Move in inspection"},
    {name: "Move out inspection"},
    {name: "Move in inspection"},
    {name: "Move in inspection"}
  ];

  config: any = {
    viewType: "Week",
    dayBeginsHour: 0,
    dayEndsHour: this.blocks.length,
    businessBeginsHour: 0,
    businessEndsHour: this.blocks.length,
    headerHeight: 30,
    hourWidth: 100,
    cellDuration: 60,
    cellHeight: 60,
    durationBarVisible: false,
    headerDateFormat: "dddd M/d/yyyy",
    onBeforeTimeHeaderRender: args => {
      let hour = args.header.time.hours();
      let block = this.blocks[hour];
      if (block) {
        args.header.html = block.name;
      }
    },
    onBeforeEventRender: args => {
      if (args.data.additional && args.data.additional.color) {
        args.data.backColor = args.data.additional.color;
        args.data.borderColor = this.darken(args.data.backColor, 0.2);
      }
    },
    onTimeRangeSelected: args => {
      let dp = this.timetable.control;
      let component = this;
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {

        dp.clearSelection();
        if (!modal.result) { return; }

        let eventData = {
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
          additional: {
            color: "#a4c2f4"
          }
        };

        dp.events.add(new DayPilot.Event(eventData));

        let blockData = component.eventToBlockData(eventData);
        console.log(blockData);
      });
    },
  };

  get rawData(): string[] {
    return this.events.map(e => JSON.stringify(this.eventToBlockData(e)));
  }

  darken(color: string, k: number): string {
    if (color[0] !== "#" || color.length !== 7) {
      throw "Color expected in full hex format, e.g. '#ffffff'";
    }
    let R = parseInt(color.substring(1, 3),16);
    let G = parseInt(color.substring(3, 5),16);
    let B = parseInt(color.substring(5, 7),16);
    return "#" + factor(R, k) + factor(G, k) + factor(B, k);

    function factor(c: number, k: number): string {
      let v = c*(1 - k);
      v = Math.round(v);
      v = Math.min(v, 255);
      v = Math.max(v, 0);
      return v.toString(16);
    }
  }

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    var from = this.timetable.control.visibleStart();
    var to = this.timetable.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result.map(data => this.blockDataToEvent(data));
    });
  }


  blockDataToEvent(e: any): any {
    let date = new DayPilot.Date(e.date);
    return {
      id: e.id,
      start: date.addHours(e.block),
      end: date.addHours(e.block).addHours(e.duration),
      text: e.text,
      additional: e.additional
    };
  }

  eventToBlockData(data: any): any {
    let date = data.start.getDatePart();
    return {
      id: data.id,
      text: data.text,
      date: date,
      block: data.start.getHours(),
      duration: data.end.getHours() - data.start.getHours(),
      additional: data.additional
    };
  }

}

