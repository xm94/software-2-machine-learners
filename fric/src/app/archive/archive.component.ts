import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [EventService]
})
export class ArchiveComponent implements OnInit {

  event: any;

  constructor(
    private readonly eventService: EventService
  ) {
    this.event = this.eventService.event;
  }

  ngOnInit() {
  }

}
