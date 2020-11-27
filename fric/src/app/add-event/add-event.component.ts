import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BackendServicesProxy } from '../services/backend.service.proxy'
import { Router } from '@angular/router'
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
  constructor(private readonly proxyService: BackendServicesProxy, private router: Router) {
    this.addEventForm = new FormGroup({
    e_id: new FormControl(),
    e_name: new FormControl(),
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

  /** From stack overflow */
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  isValidEvent(event){
    // check that there are no null objects
    for (const [key, value] of Object.entries(event)){
      if (event[key] == null){
        console.log("key",key,"is",value);
        return false;
      }

      if(key == "e_version"){
        if(isNaN(event[key])){
          console.log("key",key,"is",value,"Not a number!");
          return false;
        }
      }
      
    }
    return true;
  }
  submitEventClicked(){
    console.log("Submmitting event");
    var eventToSend = this.addEventForm.value;
    eventToSend.e_archived = false;
    // Generate uuid
    eventToSend.e_id = this.generateUUID();

    console.log(eventToSend);
    
    if(this.isValidEvent(eventToSend)){
      var objToSend = {
        event: eventToSend,
        analyst: {
          a_id: "88f44655-39d3-4e54-a798-a8cc73d53a4e"
        }
      }
      console.log(objToSend);
      var returnedItem = this.proxyService.post("/events", objToSend)
      console.log(returnedItem);
      alert("added event!");
      this.router.navigate(['home']);
    } else {
      console.log("Found null attributes!");
      alert("Please fill out all fields!");
    }
    
  }

}
