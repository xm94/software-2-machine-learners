import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: "event1", symbol: 23},
  {position: 2, name: 'Helium', weight: "testevent", symbol: 3},
  {position: 3, name: 'Lithium', weight: "myevent3", symbol: 1},
  {position: 4, name: 'Beryllium', weight: "tankexploded", symbol: 21},
  {position: 5, name: 'Boron', weight: "parachutfailure", symbol: 12},
  {position: 6, name: 'Carbon', weight: "hello", symbol: 14},
  {position: 7, name: 'Nitrogen', weight: "attacktest", symbol: 2},
  {position: 8, name: 'Oxygen', weight: "dictionarytest", symbol: 1},
  {position: 10, name: 'Neon', weight: "dictionarytest", symbol: 2},
];

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})


export class EventComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  value = 'Clear me';
  disableSelect = new FormControl(false);
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  
  constructor() { }

  ngOnInit() {
  }

  
}
