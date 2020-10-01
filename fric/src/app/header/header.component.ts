import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})

export class HeaderComponent implements OnInit {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(public matDialog: MatDialog) { }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "app-notification-modal";
    dialogConfig.height = "350px";
    dialogConfig.width = "800px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(NotificationModalComponent, dialogConfig);
  }

  checkBoxClicked() {

    if((<HTMLInputElement> document.getElementById("ipInput")).disabled){
      (<HTMLInputElement> document.getElementById("ipInput")).disabled = false;
    } else {
      (<HTMLInputElement> document.getElementById("ipInput")).disabled = true;
    }
    console.log(document.getElementById('ipInput').getAttribute('disabled'));
  }

  ngOnInit() {
  }

}
