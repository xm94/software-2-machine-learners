import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CreateSystemComponent } from '../modals/create-system/create-system.component';
import { AnalystService } from '../services/analyst.service';
import { BackendServicesProxy } from '../services/backend.service.proxy';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SystemComponent implements OnInit {

  event: any;
  systemList: any[]=[];
  displayedColumns: string[] = ['name', 'c', 'i','a','button'];

  @ViewChild(CreateSystemComponent, { static: false })
  modal: CreateSystemComponent;
  analyst;
  constructor(
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,
  ) {
    console.log(this.modal);
    
    this.event = this.eventService.event;
    this.systemList.push({s_id:"adfasdfafdsaf",s_name:"a",s_confidentiality:"H",s_integrity:"H",s_availability:"H"})
    this.analyst = this.analystService.currentUser;
    
  }
  ngOnInit() {}

  openModal() {
    this.modal.showModal(this.analyst);
  }
}
