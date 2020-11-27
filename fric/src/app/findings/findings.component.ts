import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss'],
  providers: [EventService]
})
export class FindingsComponent implements OnInit {

  event: any;

  constructor(
    private readonly eventService: EventService
  ) {
    this.event = this.eventService.event;
  }

  ngOnInit() {
  }

}
