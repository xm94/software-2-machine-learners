import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  system: any;
  dueDateSimpleFormat;

  taskAttributeToDisplayText = new Map([
    ["t_name", "Name"],
    ["t_description", "Description"],
    ["t_priority", "Priority"],
    ["t_progress", "Progress"],
    ["t_due_date", "Due Date"],
    ["t_archived", "Archived"]
  ]);
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,) {
      this.activatedRoute.params.subscribe((params)=>{
        this.taskService.getTask(params.id).subscribe((task)=>{
          console.log(task);
          this.task = task;
          this.systemService.getSystem(task.s_id).subscribe((system)=>{
            this.system = system;
            console.log(system);
          });
        });
      });
     }

  ngOnInit() {
  }

  return(){
    this.router.navigate([".."],{relativeTo: this.activatedRoute});
  }

  gotoArchive(){
    this.router.navigate(["../..","archive"])
  }

}
