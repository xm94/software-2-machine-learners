import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CreateFindingComponent } from '../modals/create-finding/create-finding.component';
import { AnalystService } from '../services/analyst.service';
import { EventService } from '../services/event.service';
import { FindingService } from '../services/finding.service';

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FindingsComponent implements OnInit {

  event: any;
  analyst: any;
  findingList: any[];
  displayedColumns: string[] = ['name', 'c', 'i','a','status','button'];
  @ViewChild(CreateFindingComponent, { static: false })
  modal: CreateFindingComponent;

  constructor(
    private readonly eventService: EventService,
    private readonly findingService: FindingService,
    private readonly analystService: AnalystService,
  ) {
    this.findingList=[]
    this.event = this.eventService.event;
    this.findingList = [{f_name:"test name"}];
    this.findingService.fetchSystems();
    console.log("constructor")
    this.findingService.allFindings.subscribe((systems) => {
      console.log("subscriber")
      var i = 1;
      for(var finding of systems){
        var exists: boolean = false;
        for(var f of this.findingList){
          if(f.f_id == finding.f_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.findingList.push(finding);
        }
      }
      this.findingList = [...this.findingList];
    });
    this.analyst = this.analystService.currentUser;
  }

  ngOnInit() {
  }

  buttonPress(){
    console.log("pressed");
  }

  openModal(){
    this.modal.showModal(this.analyst,this.event.e_id);
    console.log("pressed");
  }

}
