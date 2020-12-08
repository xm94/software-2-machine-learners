import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSubtaskComponent } from '../modals/create-subtask/create-subtask.component';
import { CreateSystemComponent } from '../modals/create-system/create-system.component';
import { CreateTaskComponent } from '../modals/create-task/create-task.component';
import { AnalystService } from '../services/analyst.service';
import { BackendServicesProxy } from '../services/backend.service.proxy';
import { EventService } from '../services/event.service';
import { SubtaskService } from '../services/subtask.service';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.scss']
})
export class SubtasksComponent implements OnInit {
  displayedColumns: string[] = ['name', 'priority', 'progress','due_date','analyst','button'];  
  event: any;
  taskList: any[]=[];
  subtaskList: any[]=[];

  @ViewChild(CreateSubtaskComponent, { static: false })
  modal: CreateSubtaskComponent;
  analyst;

  constructor(private readonly analystService: AnalystService,
    private readonly eventService: EventService,
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,) {
      this.event = this.eventService.event;
      this.taskService.fetchTasks(this.event.e_id);
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
      this.subtaskService.fetchSubtasks(this.event.e_id);
      this.subtaskService.allSubtasks.subscribe((subtasks) => {
        for(var st of subtasks){
          var exists: boolean = false;
          for(var s_task of this.subtaskList){
            if(s_task.st_id == st.st_id){
              exists=true;
              break;
            }
          }
          if(!exists){
            this.subtaskList.push(st);
          }
        }
        this.subtaskList = [...this.subtaskList];
        console.log(this.subtaskList);
      });
      this.analyst = this.analystService.currentUser;
  }

  ngOnInit() {
  }

  openModal() {
    this.modal.showModal(this.analyst,this.event.e_id);
  }

  buttonPress(st_id){
    this.router.navigate([st_id],{relativeTo: this.activatedRoute});
  }

}
