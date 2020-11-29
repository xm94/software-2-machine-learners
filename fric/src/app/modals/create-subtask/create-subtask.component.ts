import {
  Directive,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
  concatMap,
  mapTo
} from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker/typings/datepicker-module';
import { MatNativeDateModule } from '@angular/material';
import { SystemService } from 'src/app/services/system.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'create-subtask',
  templateUrl: './create-subtask.component.html',
  styleUrls: ['./create-subtask.component.scss']
})
export class CreateSubtaskComponent implements OnInit {

  form: FormGroup = new FormGroup({
    t_name: new FormControl(''), //done
    t_description: new FormControl(''), //done
    t_priority: new FormControl(''),//done
    t_progress: new FormControl(''),//done
    t_due_date: new FormControl(''),//done
    s_id: new FormControl(''),//done
  });
  s_c = new FormControl(false);
  s_i = new FormControl(false);
  s_a = new FormControl(false);
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  analystId: string;
  analsytInitials: string;
  eventId: string;
  eventTypes = ["Cooperative Vulnerability Penetration Assessment (CVPA)",
                "Cooperative Vulnerability Investigation (CVI)",
                "Verification of Fixes (VOF)"];

  classifications = ["Top Secret",
    "Secret", "Confidential",
    "Classified", "Unclassified"]
  cia = ["Informational","Low","Medium","High"]
  priority = ["Low","Medium","High"];
  progress = [
    'Not Started',
    'Assigned',
    'Transferred',
    'In progress',
    'Complete',
    'Not Applicable'
  ];
  taskList = [];

  constructor(private readonly systemService: SystemService, private readonly taskService: TaskService) {
    this.systemService.fetchSystems();
    this.taskService.fetchTasks();
      this.taskService.allTasks.subscribe((tasks) => {
        for(var t of tasks){
          var exists: boolean = false;
          for(var task of this.taskList){
            if(task.t_id == t.t_id){
              exists=true;
              break;
            }
          }
          if(!exists){
            this.taskList.push(t);
          }
        }
        this.taskList = [...this.taskList];
      });
   }

  ngOnInit() {
  }

  onHide(): void {
    this.form.reset({
      name: '',
      text: '',
    });
    this.modal.hide();
  }

  showModal(user: any,e_id: string): void {
    console.log(user);
    this.analsytInitials = user.a_initials;
    this.analystId = user.a_id;
    this.eventId = e_id;
    this.modal.show();
  }

  submit(){
    console.log(this.form.value);
    console.log(this.eventId);
    let taskJson = this.form.value;
    taskJson["t_archived"]=false;
    taskJson["e_id"]=this.eventId;
    taskJson["a_id"]=this.analystId;
    let request = {
      task:taskJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }

    console.log(request);
    //this.taskService.createTask(request);
    //this.modal.hide();
  }

}
