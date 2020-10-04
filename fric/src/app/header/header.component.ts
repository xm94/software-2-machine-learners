import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { AuthService } from '../auth/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})

export class HeaderComponent implements OnInit {
  hidden = false;
  user = { id : 1, name : 'Hello'};
  
  constructor( 
    public matDialog: MatDialog,
    private authService: AuthService
    ) { }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
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
  }

  loginButtonClicked(){
    console.log("Login button clicked");
    this.authService.ping().subscribe((response) => {
      console.log("Done")
      console.log(response);
    });
  }

  // callServer() {
  //   console.log("app.component callServer()");
  //   const headers = new HttpHeaders()
  //         .set('Authorization', 'my-auth-token')
  //         .set('Content-Type', 'application/json');

  //   this.http.post('http://localhost:4000/ping', JSON.stringify(this.user), {
  //     headers: headers
  //   })
  //   .subscribe(data => {
  //     console.log(data);
  //   });
  // }

  ngOnInit() {
  }

}
