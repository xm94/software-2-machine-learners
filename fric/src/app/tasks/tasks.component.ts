import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Task {
  title: string;
  system: string;
  analyst: string;
  priority: string;
  progress: string;
  subtaskCount: number;
  findingsCount: number;
  dueDate: string;
}

const TASK_DATA: Task[] = [
  {subtaskCount: 1, title: 'title 1', analyst: "ER", findingsCount: 23, system:"system", priority:"low", progress:"50", dueDate:"Jan 1"},
  {subtaskCount: 2, title: 'title', analyst: "EF", findingsCount: 3, system:"system", priority:"low", progress:"40", dueDate:"Jan 1"},
  {subtaskCount: 43, title: 'title', analyst: "AD", findingsCount: 1, system:"system", priority:"low", progress:"41", dueDate:"Jan 1"},
  {subtaskCount: 4, title: 'title', analyst: "AF", findingsCount: 21, system:"system", priority:"low", progress:"45", dueDate:"Jan 1"},
  {subtaskCount: 25, title: 'title', analyst: "DF", findingsCount: 12, system:"system", priority:"low", progress:"45", dueDate:"Jan 1"},
  {subtaskCount: 6, title: 'title', analyst: "DF", findingsCount: 14, system:"system", priority:"low", progress:"14", dueDate:"Jan 1"},
  {subtaskCount: 7, title: 'title', analyst: "DF", findingsCount: 2, system:"system", priority:"low", progress:"24", dueDate:"Jan 1"},
  {subtaskCount: 8, title: 'title', analyst: "AD", findingsCount: 1, system:"system", priority:"low", progress:"0", dueDate:"Jan 1"},
  {subtaskCount: 10, title: 'title', analyst: "WE", findingsCount: 2, system:"system", priority:"low", progress:"45", dueDate:"Jan 1"},
];
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'subtaskCount', 'title', 'analyst', 'findingsCount', 'system', 'priority', 'progress', 'duedate'];
  dataSource = TASK_DATA;
  value = 'Clear me';
  disableSelect = new FormControl(false);
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  constructor() { }

  ngOnInit() {
  }

}
