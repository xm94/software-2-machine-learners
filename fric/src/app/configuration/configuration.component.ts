import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [EventService]
})
export class ConfigurationComponent implements OnInit {

  event: any;

  constructor(
    private readonly eventService: EventService
  ) {
    this.event = this.eventService.event;
  }
  ngOnInit() {
  }

}
