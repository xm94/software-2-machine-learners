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
import { SubtaskService } from 'src/app/services/subtask.service';

@Component({
  selector: 'create-subtask',
  templateUrl: './create-subtask.component.html',
  styleUrls: ['./create-subtask.component.scss']
})
export class CreateSubtaskComponent implements OnInit {

  form: FormGroup = new FormGroup({
    st_name: new FormControl(''), //done
    st_description: new FormControl(''), //done
    st_priority: new FormControl(''),//done
    st_progress: new FormControl(''),//done
    st_due_date: new FormControl(''),//done
    attachments: new FormControl(),
    taskInd: new FormControl(''),//done
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

  constructor(
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    ) {
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
    let stJson = this.form.value;

    let formData = new FormData();
    for(var key in this.form.value){
      if(key!="attachments"){
        console.log(key)
        console.log(this.form.get(key).value);
        formData.append(key,this.form.get(key).value)
      }
      else{
        var aList = this.form.get(key).value;
        for(var a of aList){
          console.log(a);
          formData.append("st_attachments",a)
        }
      }
    }
    let assocTask = this.taskList[this.form.get('taskInd').value];
    console.log(assocTask);
    formData.append("st_archived","false");
    stJson["st_archived"]=false;
    formData.append("e_id",this.eventId);
    stJson["e_id"]=this.eventId;
    formData.append("a_id",this.analystId);
    stJson["a_id"]=this.analystId;
    formData.append("s_id",assocTask.s_id);
    stJson["s_id"]=assocTask.s_id;
    formData.append("t_id",assocTask.t_id);
    stJson["t_id"]=assocTask.t_id;
    stJson["st_attachments"]=[];
    stJson["st_associations"]=[];
    stJson["st_collaborators"]=[];
    formData.append("analyst_id",this.analystId);
    formData.append("analyst_initials",this.analsytInitials);
    let request = {
      subtask:stJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }

    console.log(request);
    this.subtaskService.createSubtask(formData);
    this.modal.hide();
  }

}
