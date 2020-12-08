import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy'
import { TransactionLogService } from './transaction-log.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private _allSystems: Subject<any> = new BehaviorSubject([]);

  get allSystems() {
    //console.log('getting');
    //console.log(this._allSystems)
    return this._allSystems.asObservable();
  }

  private setAllSystems(response: HttpResponse<Object>){
    this._allSystems.next(response.body);
    //console.log(this._allSystems);
    return this._allSystems;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly transactionLogService: TransactionLogService,
    private readonly router: Router
  ) {}

  fetchSystems(): any[] {
    console.log("getting systems");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/systems');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllSystems(r);
        return r.body;
    })
    return []
  }

  createSystem(data: any): Observable<any> {
    this.backendServicesProxy
      .post("/systems",data)
      .pipe(map(response => response.body as any))
      .subscribe(
        system => {
          console.log("event posted");
          console.log(system);
          if(system!=null){
            //localStorage.setItem("event",JSON.stringify(event));
            this._allSystems.next([system]);
            this.transactionLogService.fetchTransactions();
            //console.log("setting");
          }
          //var redirectUrl = '/event-created';
      // }
            //this.router.navigateByUrl(redirectUrl);
        },
        error => {
          this._allSystems.error(error);
        }
      );

    return this._allSystems.asObservable();
  }

  getSystem(s_id: string): Observable<any> {
    return this.backendServicesProxy.get('/systems/'+s_id)
    .pipe(map(response => response.body));
  }

  getArchivedSystems(e_id: string): Observable<any> {
    return this.backendServicesProxy.get('/systems/archive/'+e_id)
    .pipe(map(response => response.body));
  }

  archiveSystem(s_id: string): Observable<any> {
    return this.backendServicesProxy.put('/systems/archive/'+s_id)
    .pipe(map(response => response.body));
  }
}
