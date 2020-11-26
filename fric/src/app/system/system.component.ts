import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  providers: [EventService]
})
export class SystemComponent implements OnInit {

  event: any;

  constructor(
    private readonly eventService: EventService
  ) {
    this.event = this.eventService.event;
  }
  ngOnInit() {
  }

}
