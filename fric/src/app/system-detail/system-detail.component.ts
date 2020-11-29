import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.scss']
})
export class SystemDetailComponent implements OnInit {
  system:any;
  test2:any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemService: SystemService) {
      this.activatedRoute.params.subscribe((params)=>{
        this.systemService.getSystem(params.id).subscribe((sys)=>{
          console.log(sys);
          this.system = sys;
        });
      });
     }

  ngOnInit() {
  }

  return(){
    this.router.navigate([".."],{relativeTo: this.activatedRoute});
  }

}
