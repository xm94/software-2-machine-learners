import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface NotificationTemplate {
  taskDueDate: string;
  taskTitle: string;
  subtaskTitle: string;
  subtaskDueDate: string;
}

const notifs: NotificationTemplate[] = [
  {taskTitle: 'Investigate UTEP Internet Security', taskDueDate: '17/9/2020', subtaskTitle: 'Investigate WAN Security', subtaskDueDate: '17/9/2020'},
  {taskTitle: 'Investigate UTEP Internet Security', taskDueDate: '17/9/2020', subtaskTitle: 'Investigate LAN Security', subtaskDueDate: '17/9/2020'},
  {taskTitle: 'Investigate UTEP Internet Security', taskDueDate: '17/9/2020', subtaskTitle: '', subtaskDueDate: ''},

];

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})


export class NotificationModalComponent implements OnInit {
  displayedColumns: string[] = ['taskTitle', 'taskDueDate', 'subtaskTitle', 'subtaskDueDate'];
  dataSource = notifs;
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>
  ) { }

  ngOnInit() { }


  closeModal() {
    this.dialogRef.close();
  }

}