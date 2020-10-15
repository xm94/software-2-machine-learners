import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BackendServicesProxy } from '../services/backend.service.proxy'
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
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [BackendServicesProxy]
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;
  eventID;
  eventName;
  eventDescription;
  eventType;
  eventVersion;
  eventAssessmentDate;
  eventSecClassTitleGuide;
  eventOrganizationName;
  eventClassification;
  eventDeclassificationDate;
  eventCustomer;
  res;

  value = 'Clear me';
  disableSelect = new FormControl(false);
  displayedColumns: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  toppings = new FormControl();
  toppingList: string[] = ['type1', 'type2', 'type3'];
  constructor(private readonly proxyService: BackendServicesProxy) {
    this.addEventForm = new FormGroup({
    e_id: new FormControl(),
    e_name: new FormControl({}),
    e_description: new FormControl(),
    e_type: new FormControl(),
    e_version: new FormControl(),
    e_assessment_date: new FormControl(),
    e_org_name: new FormControl(),
    e_sec_class_title_guide: new FormControl(),
    e_classification: new FormControl(),
    e_declassification_date: new FormControl(),
    e_customer : new FormControl(),
    e_archived: new FormControl()
  }) }

  ngOnInit() {
  }

  submitEventClicked(){
    console.log("Submmitting event");
    

    var objToSend = {
      event:this.addEventForm.value,
      analyst: {
        a_id: "88f44655-39d3-4e54-a798-a8cc73d53a4e"
      }
    }
    console.log(objToSend);
    var returnedItem = this.proxyService.post("/events", objToSend)
    console.log(returnedItem);
  }

}
