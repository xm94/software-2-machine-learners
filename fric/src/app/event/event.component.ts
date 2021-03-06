import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BackendServicesProxy } from '../services/backend.service.proxy'
import { AnalystService } from "../services/analyst.service"
import { EventService } from '../services/event.service';
import { CreateEventModal } from '../modals/create-event/create-event.component'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [BackendServicesProxy,AnalystService]
})


export class EventComponent implements OnInit {
  event: any;
  eventList: any[];
  archivedEvents: any[];
  @ViewChild(CreateEventModal, { static: false })
  modal: CreateEventModal;
  analyst;
  // This is used on the html for displaying the correct attributes
  eventAttributeToDisplayText = new Map([
    ["createdAt", "Created At"],
    ["e_assessment_date", "Assessment Date"],
    ["e_classification", "Classification"],
    ["e_customer", "Customer"],
    ["e_declassification_date", "Declassification Date"],
    ["e_description", "Description"],
    ["e_name", "Name"],
    ["e_org_name", "Organization Name"],
    ["e_sec_class_title_guide", "Sec Class Title Guide"],
    ["e_type", "Type"],
    ["e_version", "Version"],
    ["e_updated_at", "Updated At"]
  ]);
  
  constructor(
    private readonly proxyService: BackendServicesProxy,
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,) { 
      this.eventService.allEvents.subscribe((events) => {this.eventList=events});
      this.event=this.eventService.event;
      console.log(this.modal);
      this.analyst = this.analystService.currentUser;
      this.eventService.getArchivedEvents().subscribe((events) => {this.archivedEvents=events;console.log(events)})
    }

  ngOnInit() {
  }

  openModal() {
    this.modal.showModal(this.analyst);
  }
  
}
