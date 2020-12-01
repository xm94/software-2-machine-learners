import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  evidenceList: any []=[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly findingService: FindingService,
    private readonly systemService: SystemService,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.findingService.getFinding(params.id).subscribe((finding)=>{
        this.finding = finding;
        console.log(finding);
        for(var e of finding.f_evidence){
          let base64String = btoa(new Uint8Array(e.f_evidence.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));
          this.evidenceList.push("data:image/jpg;base64,"+base64String)
          
        }
        this.evidenceList = [...this.evidenceList];
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

  archive(){
    this.findingService.archiveFinding(this.finding.f_id).subscribe((finding)=>{
      console.log(finding);
      this.router.navigate(["../..","archive"]);
    })
  }

  gotoArchive(){
    this.router.navigate(["../..","archive"])
  }
}
