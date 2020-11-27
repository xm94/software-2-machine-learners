import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-created',
  templateUrl: './event-created.component.html',
  styleUrls: ['./event-created.component.scss']
})
export class EventCreatedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['event']);
  }, 2000);  //5s
  }

}
