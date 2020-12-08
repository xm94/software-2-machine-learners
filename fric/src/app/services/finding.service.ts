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
export class FindingService {
  private _allFindings: Subject<any> = new BehaviorSubject([]);

  get allFindings() {
    //console.log('getting');
    //console.log(this._allFindings)
    return this._allFindings.asObservable();
  }

  private setAllFindings(response: HttpResponse<Object>){
    this._allFindings.next(response.body);
    //console.log(this._allFindings);
    return this._allFindings;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly transactionLogService: TransactionLogService,
    private readonly router: Router
  ) {}

  fetchFindings(): any[] {
    console.log("getting systems");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/findings');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllFindings(r);
        return r.body;
    })
    return []
  }

  async createFinding(data: any): Promise<Observable<any>> {
    await this.backendServicesProxy
      .post("/findings",data)
      .pipe(map(response => response.body as any))
      .subscribe(
        finding => {
          console.log("finding posted");
          console.log(finding);
          if(finding!=null){
            //localStorage.setItem("event",JSON.stringify(event));
            this.transactionLogService.fetchTransactions();
            this._allFindings.next([finding]);
            //console.log("setting");
          }
          //var redirectUrl = '/event-created';
      // }
            //this.router.navigateByUrl(redirectUrl);
        },
        error => {
          this._allFindings.error(error);
        }
      );

    return this._allFindings.asObservable();
  }

  getFinding(f_id: string): Observable<any> {
    return this.backendServicesProxy.get('/findings/'+f_id)
    .pipe(map(response => response.body));
  }

  getArchivedFindings(e_id: string): Observable<any> {
    return this.backendServicesProxy.get('/findings/archive/'+e_id)
    .pipe(map(response => response.body));
  }

  archiveFinding(f_id: string): Observable<any> {
    return this.backendServicesProxy.put('/findings/archive/'+f_id)
    .pipe(map(response => response.body));
  }
}
