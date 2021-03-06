import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { SubtaskService } from '../services/subtask.service';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-subtask-detail',
  templateUrl: './subtask-detail.component.html',
  styleUrls: ['./subtask-detail.component.scss']
})
export class SubtaskDetailComponent implements OnInit {
  task: any;
  subtask: any;
  attachmentsList: any []=[];
  subTaskAttributeToDisplayText = new Map([
    ["st_name", "Name"],
    ["st_priority", "Priority"],
    ["st_progress", "Progress"],
    ["st_due_date", "Due Date"],
    ["st_description", "Description"],
  ])
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService) {
      this.activatedRoute.params.subscribe((params)=>{
       
        this.subtaskService.getSubtask(params.id).subscribe((subtask)=>{
          for(var e of subtask.st_attachments){
            let base64String = btoa(new Uint8Array(e.st_attachment.data).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, ''));
            this.attachmentsList.push("data:image/jpg;base64,"+base64String)
          }
          console.log(subtask);
          this.subtask = subtask;
          this.taskService.getTask(subtask.t_id).subscribe((task)=>{
            this.task = task;
            console.log(task);
          });
        });
      });
    
    }

  ngOnInit() {
  }

  return(){
    this.router.navigate([".."],{relativeTo: this.activatedRoute});
  }

  goToTask(t_id){
    this.router.navigate(["/tasks/"+t_id])
  }
  archive(){
    this.subtaskService.archiveSubtask(this.subtask.st_id).subscribe((subtask)=>{
      console.log(subtask);
      this.router.navigate(["../..","archive"]);
    })
  }

  gotoArchive(){
    this.router.navigate(["../..","archive"])
  }

}
