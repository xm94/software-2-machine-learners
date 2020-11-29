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

}
