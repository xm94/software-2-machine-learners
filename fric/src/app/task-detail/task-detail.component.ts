import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { element } from 'protractor';
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
  attachmentsList: any []=[];
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
          for(var e of task.t_attachments){
            let base64String = btoa(new Uint8Array(e.t_attachment.data).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, ''));
            this.attachmentsList.push("data:image/jpg;base64,"+base64String)
          }
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

  goToSystem(s_id){
    this.router.navigate(["/system/"+s_id]);
  }

  gotoArchive(){
    this.router.navigate(["../..","archive"])
  }

}
