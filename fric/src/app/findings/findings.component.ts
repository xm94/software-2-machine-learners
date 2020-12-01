import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.findingList=[]
    this.event = this.eventService.event;
    this.findingService.fetchFindings();
    console.log("constructor")
    this.findingService.allFindings.subscribe((findings) => {
      console.log("subscriber")
      for(var finding of findings){
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

  buttonPress(f){
    console.log("pressed");
    console.log(f);
    this.router.navigate([f.f_id],{relativeTo: this.activatedRoute});
  }

  openModal(){
    this.modal.showModal(this.analyst,this.event.e_id);
    console.log("pressed");
  }

}
