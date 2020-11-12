import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Sub_Task {
  title: string;
  task: string;
  analyst: string;
  progress: string;
  subtaskCount: number;
  findingsCount: number;
  dueDate: string;
}
const TASK_DATA: Sub_Task[] = [
  {subtaskCount: 1, title: 'title 1', analyst: "XM", findingsCount: 23, task:"task", progress:"52", dueDate:"Jan 1"},
  {subtaskCount: 2, title: 'cancel request', analyst: "XM", findingsCount: 3, task:"task", progress:"23", dueDate:"Jan 1"},
  {subtaskCount: 3, title: 'perform test', analyst: "EM", findingsCount: 1, task:"task", progress:"42", dueDate:"Jan 1"},
  {subtaskCount: 4, title: 'do this', analyst: "RC", findingsCount: 21, task:"task", progress:"43", dueDate:"Jan 1"},
  {subtaskCount: 5, title: 'do that', analyst: "DF", findingsCount: 12, task:"task", progress:"2", dueDate:"Jan 1"},
  {subtaskCount: 6, title: 'temp title', analyst: "DF", findingsCount: 14, task:"task", progress:"42", dueDate:"Jan 1"},
  {subtaskCount: 7, title: 'testing', analyst: "ER", findingsCount: 2, task:"task", progress:"76", dueDate:"Jan 1"},
  {subtaskCount: 80, title: 'update', analyst: "ER", findingsCount: 1, task:"task", progress:"45", dueDate:"Jan 1"},
  {subtaskCount: 10, title: 'element update', analyst: "ER", findingsCount: 2, task:"task", progress:"88", dueDate:"Jan 1"},
];

export interface Finding{
  id: string;
  title: string;
  system: string;
  task: string;
  subtask: string;
  analyst: string;
  status: string;
  classification: string;
  type: string;
  risk: string
}

const FINDINGS_DATA: Finding[] = [
  {
    id: "id",
    title: "findings title",
    system: "sytem name",
    task: "task name",
    subtask: "subtask name",
    analyst: "EM",
    status: "Done",
    classification: "classification",
    type: "type",
    risk: "low"
  }
]
@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss']
})
export class FindingsComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'id', 'title', 'system', 'task', 'subtask', 'analyst', 'status', 'classification', 'type', 'risk'];
  dataSource = FINDINGS_DATA;
  value = 'Clear me';
  disableSelect = new FormControl(false);
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  constructor() { }

  ngOnInit() {
  }

}
