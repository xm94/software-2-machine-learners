import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalystService } from '../services/analyst.service';
import { EventService } from '../services/event.service';
import { FindingService } from '../services/finding.service';
import { SubtaskService } from '../services/subtask.service';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-analyst-progress',
  templateUrl: './analyst-progress.component.html',
  styleUrls: ['./analyst-progress.component.scss']
})
export class AnalystProgressComponent implements OnInit {
  analyst: any;
  assignedTasks = [];
  assignedSubtasks = [];
  assignedFindings = [];
  collabTasks = [];
  collabSubtasks = [];
  collabFindings = [];
  displayedSystemColumns: string[] = ['name', 'c', 'i','a','button'];
  displayedTaskColumns: string[] = ['name', 'priority', 'progress','due_date','analyst','button']; 
  displayedFindingColumns: string[] = ['name', 'c', 'i','a','status','button'];

  constructor(
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    private readonly findingSerivce: FindingService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.analyst = this.analystService.currentUser;
    this.taskService.getAnalystTasks(this.analyst.a_id).subscribe(
      (a_tasks) => {
        this.assignedTasks = a_tasks;
      }
    );
    this.taskService.getCollaboratorTasks(this.analyst.a_id).subscribe(
      (c_tasks) => {
        this.collabTasks = c_tasks;
      }
    );
    this.subtaskService.getAnalystSubtasks(this.analyst.a_id).subscribe(
      (a_subtasks) => {
        this.assignedSubtasks = a_subtasks;
      }
    );
    this.subtaskService.getCollaboratorSubtasks(this.analyst.a_id).subscribe(
      (c_subtasks) => {
        this.collabSubtasks = c_subtasks;
      }
    )
    this.findingSerivce.getAnalystFindings(this.analyst.a_id).subscribe(
      (a_findings) => {
        this.assignedFindings = a_findings;
      }
    );
    this.findingSerivce.getCollaboratorFindings(this.analyst.a_id).subscribe(
      (c_findings) => {
        this.collabFindings = c_findings;
      }
    );
   }

  ngOnInit() {
  }

  systemPress(s_id: string){
    this.router.navigate(["..","system",s_id],{relativeTo: this.activatedRoute});
    console.log("go to system view");
  }

  taskPress(t_id: string){
    this.router.navigate(["..","tasks",t_id],{relativeTo: this.activatedRoute});
    console.log("got to deatil task");
  }

  subtaskPress(st_id: string){
    this.router.navigate(["..","subtasks",st_id],{relativeTo: this.activatedRoute});
    console.log("go 2 subtask detail");
  }

  findingPress(f_id: string){
    this.router.navigate(["..","findings",f_id],{relativeTo: this.activatedRoute});
    console.log("go 3 finding");
  }

}
