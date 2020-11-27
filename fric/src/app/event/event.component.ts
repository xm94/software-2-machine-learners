import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BackendServicesProxy } from '../services/backend.service.proxy'
import { AnalystService } from "../services/analyst.service"
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [BackendServicesProxy,AnalystService]
})


export class EventComponent implements OnInit {
  event: any;
  eventList: any[];
  constructor(
    private readonly proxyService: BackendServicesProxy,
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,) { 
      this.eventService.allEvents.subscribe((events) => {this.eventList=events});
      this.event=this.eventService.event;
    }

  ngOnInit() {
  }

  
}
