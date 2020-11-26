import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';

import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { AuthService } from './auth/auth.service';
import { BackendServicesProxy } from './services/backend.service.proxy'
import { AnalystService } from "./services/analyst.service"
import { EventService } from "./services/event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BackendServicesProxy,AnalystService,EventService]
})
export class AppComponent {
  // This is just to get rid of the red underline given by vscode
  myForm:FormGroup;
  otherForm : FormGroup;
  lead:boolean = false;
  event_list:any;
  initials:string = "";
  title = 'Findings and Reportings Information Console';
  constructor( 
    private readonly proxyService: BackendServicesProxy,
    private readonly analystService: AnalystService,
    private readonly eventService: EventService,
    public matDialog: MatDialog,
    private authService: AuthService
    ) {
      this.initials= analystService.currentUser? analystService.currentUser.a_initials : 'GG';
      this.eventService.reloadEvent();
      this.eventService.event;
     }

  checkBoxClicked() {
    this.lead = (<HTMLInputElement> document.getElementById("exampleCheck1")).checked ? true : false ;
  }
  loginButtonClicked(){
    console.log((<HTMLInputElement> document.getElementById("ipInput")).value);
    this.initials = (<HTMLInputElement> document.getElementById("ipInput")).value;
    var request = {initials:this.initials,lead:this.lead};
    console.log("Login button clicked");
    //var analyst = this.proxyService.post("/login/",request).subscribe(analyst => console.log(analyst.body));
    this.analystService.login(this.initials,this.lead);
    console.log(this.analystService.currentUser);
  }
}
