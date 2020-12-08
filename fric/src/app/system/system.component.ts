import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSystemComponent } from '../modals/create-system/create-system.component';
import { AnalystService } from '../services/analyst.service';
import { BackendServicesProxy } from '../services/backend.service.proxy';
import { EventService } from '../services/event.service';
import { SystemService } from '../services/system.service';
import { TransactionLogService } from '../services/transaction-log.service';

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
    private readonly systemService: SystemService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
        
    this.event = this.eventService.event;
    this.systemService.fetchSystems(this.event.e_id);
    this.systemService.allSystems.subscribe((systems) => {
      for(var sys of systems){
        var exists: boolean = false;
        for(var s of this.systemList){
          if(s.s_id == sys.s_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.systemList.push(sys);
        }
      }
      this.systemList = [...this.systemList];
    });
    this.analyst = this.analystService.currentUser;
    
  }
  ngOnInit() {}

  openModal() {
    this.modal.showModal(this.analyst,this.event.e_id);
  }

  buttonPress(s_id){
    this.router.navigate([s_id],{relativeTo: this.activatedRoute});
  }

}
