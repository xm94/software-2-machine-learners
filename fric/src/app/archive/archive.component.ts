import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { FindingService } from '../services/finding.service';
import { SubtaskService } from '../services/subtask.service';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [EventService]
})
export class ArchiveComponent implements OnInit {
  event: any;
  systemList: any[];
  taskList: any[];
  subtaskList: any[];
  findingList: any[];
  displayedSystemColumns: string[] = ['name', 'c', 'i','a','button'];
  displayedTaskColumns: string[] = ['name', 'priority', 'progress','due_date','analyst','button']; 
  displayedFindingColumns: string[] = ['name', 'c', 'i','a','status','button'];


  constructor(
    private readonly eventService: EventService,
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    private readonly findingService: FindingService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.event = this.eventService.event;
    this.systemService.getArchivedSystems(this.event.e_id).subscribe(
      (systems) =>{
        this.systemList=systems;
      }
    );
    this.taskService.getArchivedTasks(this.event.e_id).subscribe(
      (tasks) => {
        this.taskList=tasks;
      }
    );
    this.subtaskService.getArchivedSubtasks(this.event.e_id).subscribe(
      (subtasks) => {
        this.subtaskList=subtasks;
      }
    );
    this.findingService.getArchivedFindings(this.event.e_id).subscribe(
      (findings) => {
        this.findingList=findings;
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
