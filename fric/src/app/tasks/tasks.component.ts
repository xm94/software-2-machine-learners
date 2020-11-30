import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSystemComponent } from '../modals/create-system/create-system.component';
import { CreateTaskComponent } from '../modals/create-task/create-task.component';
import { AnalystService } from '../services/analyst.service';
import { BackendServicesProxy } from '../services/backend.service.proxy';
import { EventService } from '../services/event.service';
import { SystemService } from '../services/system.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['name', 'priority', 'progress','due_date','analyst','button'];  
  event: any;
  taskList: any[]=[];

  @ViewChild(CreateTaskComponent, { static: false })
  modal: CreateTaskComponent;
  analyst;
  constructor(
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,) {
      this.event = this.eventService.event;
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
        console.log(this.taskList);
      });
      this.analyst = this.analystService.currentUser;
    }

  ngOnInit() {
  }

  openModal() {
    this.modal.showModal(this.analyst,this.event.e_id);
  }

  buttonPress(t_id){
    this.router.navigate([t_id],{relativeTo: this.activatedRoute});
  }

}
