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
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component'
import { AnalystService } from 'src/app/services/analyst.service';
@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({
    t_name: new FormControl(''), //done
    t_description: new FormControl(''), //done
    t_priority: new FormControl(''),//done
    t_progress: new FormControl(''),//done
    t_due_date: new FormControl(''),//done
    s_id: new FormControl(''),//done
    a_id: new FormControl(''),
    t_collaborators: new FormControl(''),
    t_attachments: new FormControl(),
    t_associations: new FormControl(),
  });
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
  systems = [];
  analysts = [];
  tasks = [];

  constructor(
    private readonly systemService: SystemService, 
    private readonly taskService: TaskService,
    private readonly analystService: AnalystService
    ) {
    this.systemService.fetchSystems();
    this.systemService.allSystems.subscribe((systems) => {
      for(var sys of systems){
        var exists: boolean = false;
        for(var s of this.systems){
          if(s.s_id == sys.s_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.systems.push(sys);
        }
      }
      this.systems = [...this.systems];
    });
    this.analystService.fetchAnalysts();
    this.analystService.allAnalysts.subscribe((analysts) => {
      for(var analyst of analysts){
        var exists: boolean = false;
        for(var a of this.analysts){
          if(a.a_id==analyst.a_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.analysts.push(analyst);
        }
      }
      this.analysts = [...this.analysts];
    });
    this.taskService.allTasks.subscribe((tasks) => {
      for(var t of tasks){
        var exists: boolean = false;
        for(var task of this.tasks){
          if(task.t_id == t.t_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.tasks.push(t);
        }
      }
      this.tasks = [...this.tasks];
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
    let formData = new FormData();

    for(var key in this.form.value){
      if(key!="t_attachments"&&key!="t_collaborators"&&key!="t_associations"){
        console.log(key)
        console.log(this.form.get(key).value);
        formData.append(key,this.form.get(key).value)
      }
      else{
        console.log("multivalue");
        var multiValue = this.form.get(key).value;
        console.log(key);
        if(multiValue){
          for(var m of multiValue){
            console.log(m);
            formData.append(key,m)
          }
        }
      }
    }
    formData.append("t_archived","false");
    taskJson["t_archived"]=false;
    formData.append("e_id",this.eventId);
    taskJson["e_id"]=this.eventId;
    
    formData.append("analyst_id",this.analystId);
    formData.append("analyst_initials",this.analsytInitials);
    taskJson["t_attachments"]=[];
    taskJson["t_associations"]=[];
    taskJson["t_collaborators"]=[];
    let request = {
      task:taskJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }

    console.log(request);
    this.taskService.createTask(formData);
    this.modal.hide();
  }

}
