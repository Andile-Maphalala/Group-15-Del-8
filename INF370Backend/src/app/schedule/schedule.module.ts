import {DataService} from "src/app/Services/data.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ScheduleComponent} from "src/app/schedule/schedule.component";
import {DayPilotModule} from "daypilot-pro-angular";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule,
    
  ],
  declarations: [
    ScheduleComponent
  ],
  exports:      [ ScheduleComponent],
  providers:    [ DataService ]
})
export class ScheduleModule { }
