import { Component, OnInit } from '@angular/core';


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
  {position: 9, name: 'Fluorine', weight: "hi", symbol: 1},
  {position: 10, name: 'Neon', weight: "cs4311", symbol: 5},
  {position: 1, name: 'Hydrogen', weight: "test", symbol: 6},
  {position: 2, name: 'Helium', weight: "and", symbol: 2},
  {position: 3, name: 'Lithium', weight: "sss", symbol: 12},
  {position: 4, name: 'Beryllium', weight: "dictionarytest", symbol: 10},
  {position: 5, name: 'Boron', weight: "dictionarytest", symbol: 41},
  {position: 6, name: 'Carbon', weight: "dictionarytest", symbol: 22},
  {position: 7, name: 'Nitrogen', weight: "dictionarytest", symbol: 11},
  {position: 8, name: 'Oxygen', weight: "dictionarytest", symbol: 1},
  {position: 9, name: 'Fluorine', weight: "dictionarytest", symbol: 5},
  {position: 10, name: 'Neon', weight: "dictionarytest", symbol: 6},
  {position: 1, name: 'Hydrogen', weight: "dictionarytest", symbol: 6},
  {position: 2, name: 'Helium', weight: "dictionarytest", symbol: 8},
  {position: 3, name: 'Lithium', weight: "dictionarytest", symbol: 2},
  {position: 4, name: 'Beryllium', weight: "dictionarytest", symbol: 2},
  {position: 5, name: 'Boron', weight: "dictionarytest" ,symbol: 2},
  {position: 6, name: 'Carbon', weight: "dictionarytest", symbol: 2},
  {position: 7, name: 'Nitrogen', weight: "dictionarytest", symbol: 5},
  {position: 8, name: 'Oxygen', weight: "dictionarytest", symbol: 4},
  {position: 9, name: 'Fluorine', weight: "dictionarytest", symbol: 3},
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
  constructor() {
   }

  ngOnInit() {
  }

}
