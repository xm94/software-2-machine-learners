import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _allTasks: Subject<any> = new BehaviorSubject([]);

  get allTasks() {
    //console.log('getting');
    //console.log(this._allSystems)
    return this._allTasks.asObservable();
  }

  private setAllTasks(response: HttpResponse<Object>){
    this._allTasks.next(response.body);
    //console.log(this._allSystems);
    return this._allTasks;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}

  fetchTasks(): any[] {
    console.log("getting tasks");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/tasks');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllTasks(r);
        return r.body;
    })
    return []
  }

  createTask(data: any): Observable<any> {
    this.backendServicesProxy
      .post("/tasks",data)
      .pipe(map(response => response.body as any))
      .subscribe(
        task => {
          console.log("event posted");
          console.log(task);
          if(task!=null){
            //localStorage.setItem("event",JSON.stringify(event));
            this._allTasks.next([task]);
            //console.log("setting");
          }
          //var redirectUrl = '/event-created';
      // }
            //this.router.navigateByUrl(redirectUrl);
        },
        error => {
          this._allTasks.error(error);
        }
      );

    return this._allTasks.asObservable();
  }

  getTask(t_id: string): Observable<any> {
    return this.backendServicesProxy.get('/tasks/'+t_id)
    .pipe(map(response => response.body));
  }
}
