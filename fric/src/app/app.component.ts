import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';

import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // This is just to get rid of the red underline given by vscode
  myForm:FormGroup;
  otherForm : FormGroup;

  title = 'Findings and Reportings Information Console';
  constructor( 
    
    public matDialog: MatDialog,
    private authService: AuthService
    ) {
      
     }

  checkBoxClicked() {
    if((<HTMLInputElement> document.getElementById("ipInput")).disabled){
      (<HTMLInputElement> document.getElementById("ipInput")).disabled = false;
    } else {
      (<HTMLInputElement> document.getElementById("ipInput")).disabled = true;
    }
  }
  loginButtonClicked(){
    console.log("Login button clicked");
    this.authService.ping().subscribe(function(response) {
      console.log("Done")
      console.log(response);
    });

  }
}
