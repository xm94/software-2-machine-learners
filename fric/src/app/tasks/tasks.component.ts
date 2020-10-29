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

const ELEMENT_DATA: Task[] = [
  {subtaskCount: 1, title: 'title 1', analyst: "event1", findingsCount: 23, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 2, title: 'Helium', analyst: "testevent", findingsCount: 3, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 3, title: 'Lithium', analyst: "myevent3", findingsCount: 1, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 4, title: 'Beryllium', analyst: "analyst", findingsCount: 21, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 5, title: 'Boron', analyst: "parachutfailure", findingsCount: 12, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 6, title: 'Carbon', analyst: "hello", findingsCount: 14, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 7, title: 'Nitrogen', analyst: "attacktest", findingsCount: 2, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 8, title: 'Oxygen', analyst: "dictionarytest", findingsCount: 1, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
  {subtaskCount: 10, title: 'Neon', analyst: "dictionarytest", findingsCount: 2, system:"system", priority:"low", progress:"progress", dueDate:"Jan 1"},
];
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'subtaskCount', 'title', 'analyst', 'findingsCount', 'system', 'priority', 'progress', 'duedate'];
  dataSource = ELEMENT_DATA;
  value = 'Clear me';
  disableSelect = new FormControl(false);
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  constructor() { }

  ngOnInit() {
  }

}
