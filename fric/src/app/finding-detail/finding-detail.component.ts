import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { FindingService } from '../services/finding.service';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-finding-detail',
  templateUrl: './finding-detail.component.html',
  styleUrls: ['./finding-detail.component.scss']
})
export class FindingDetailComponent implements OnInit {
  finding:any;
  system:any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly findingService: FindingService,
    private readonly systemService: SystemService,
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.findingService.getFinding(params.id).subscribe((finding)=>{
        this.finding = finding;
        console.log(finding);
        this.systemService.getSystem(finding.s_id).subscribe((system)=>{
          this.system = system;
          console.log(system);
        });
      });
    });
   }

  ngOnInit() {
  }

  return(){
    this.router.navigate([".."],{relativeTo: this.activatedRoute});
  }
}
