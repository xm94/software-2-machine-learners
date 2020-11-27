import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  providers: [EventService]
})
export class SetupComponent implements OnInit {

  event: any;

  constructor(
    private readonly eventService: EventService
  ) {
    this.event = this.eventService.event;
  }
  ngOnInit() {
  }

}
