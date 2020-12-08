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
export class SubtaskService {

  private _allSubtasks: Subject<any> = new BehaviorSubject([]);

  get allSubtasks() {
    //console.log('getting');
    //console.log(this._allSystems)
    return this._allSubtasks.asObservable();
  }

  private setAllSubtasks(response: HttpResponse<Object>){
    this._allSubtasks.next(response.body);
    //console.log(this._allSystems);
    return this._allSubtasks;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly transactionLogService: TransactionLogService,
    private readonly router: Router
  ) {}

  fetchSubtasks(): any[] {
    console.log("getting subtasks");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/subtasks');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllSubtasks(r);
        return r.body;
    })
    return []
  }

  createSubtask(data: any): Observable<any> {
    this.backendServicesProxy
      .post("/subtasks",data)
      .pipe(map(response => response.body as any))
      .subscribe(
        subtask => {
          console.log("subtask posted");
          console.log(subtask);
          if(subtask!=null){
            //localStorage.setItem("event",JSON.stringify(event));
            this._allSubtasks.next([subtask]);
            this.transactionLogService.fetchTransactions();
            //console.log("setting");
          }
          //var redirectUrl = '/event-created';
      // }
            //this.router.navigateByUrl(redirectUrl);
        },
        error => {
          this._allSubtasks.error(error);
        }
      );

    return this._allSubtasks.asObservable();
  }

  getSubtask(st_id: string): Observable<any> {
    return this.backendServicesProxy.get('/subtasks/'+st_id)
    .pipe(map(response => response.body));
  }

  getAnalystSubtasks(a_id: string): Observable<any> {
    return this.backendServicesProxy.get('/subtasks/analyst/'+a_id)
    .pipe(map(response => response.body));
  }

  getCollaboratorSubtasks(a_id: string): Observable<any> {
    return this.backendServicesProxy.get('/subtasks/collaborator/'+a_id)
    .pipe(map(response => response.body));
  }

  getArchivedSubtasks(e_id: string): Observable<any> {
    return this.backendServicesProxy.get('/subtasks/archive/'+e_id)
    .pipe(map(response => response.body));
  }
  archiveSubtask(st_id: string): Observable<any> {
    return this.backendServicesProxy.put('/subtasks/archive/'+st_id)
    .pipe(map(response => response.body));
  }
}
