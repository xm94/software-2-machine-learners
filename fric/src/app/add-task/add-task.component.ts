import { Component, OnInit } from '@angular/core';
import { BackendServicesProxy } from '../services/backend.service.proxy'
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  taskID;
  taskName;
  taskDescription;
  taskPriority;
  taskProgress;
  taskDueDate;
  systemID;
  analystID;
  taskArchived;

  value = 'Clear me';
  disableSelect = new FormControl(false);
  displayedColumns: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol'];
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  constructor(private readonly proxyService: BackendServicesProxy) {
    this.addTaskForm = new FormGroup({
    t_name: new FormControl({}),
    t_description: new FormControl(),
    t_priority: new FormControl(),
    t_progress: new FormControl(),
    t_due_date: new FormControl(),
    s_id: new FormControl(),
    a_id: new FormControl(),
    t_archived: new FormControl(),
  }) }
  ngOnInit() {
  }
  submitTaskClicked(){
    console.log("Submmitting task");
    

    var objToSend = {
      task:this.addTaskForm.value,
      analyst: {
        a_id: "88f44655-39d3-4e54-a798-a8cc73d53a4e"
      }
    }
    // FIXME this is wrong, but works for now
    objToSend.task.a_id = "88f44655-39d3-4e54-a798-a8cc73d53a4e"
    objToSend.task.s_id = objToSend.task.a_id = "88f44655-39d3-4e54-a798-a8cc73d53a4e";
    objToSend.task.t_archived = false;

    objToSend.task.t_attachments = [];
    objToSend.task.t_collaborators = [];
    objToSend.task.t_associations = [];

    console.log(objToSend);
    var returnedItem = this.proxyService.post("/tasks", objToSend)
    console.log(returnedItem);
  }
}
