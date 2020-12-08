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
export class EventService {
  

  private _allEvents: Subject<any> = new BehaviorSubject([]);

  private readonly _event: BehaviorSubject<any> = new BehaviorSubject([]);

  get allEvents() {
    //console.log('getting');
    //console.log(this._allEvents)
    return this._allEvents.asObservable();
  }

  get event(){
    let curEvent = localStorage.getItem("event");
    if(curEvent!=null){
        //console.log("there is an event");
        return JSON.parse(localStorage.getItem("event"));
    }
    else{
        //console.log("no event");
        return null;
    }
  }

  private setAllEvents(response: HttpResponse<Object>){
    this._allEvents.next(response.body);
    //console.log(this._allEvents);
    return this._allEvents;
  }

  userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly transactionLogService: TransactionLogService,
    private readonly router: Router
  ) {}


  fetchEvents(): any[] {
    //console.log("getting event");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/events');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllEvents(r);
        return r.body;
    })
    return []
  }

  reloadEvent(): Observable<any> {
    this.backendServicesProxy
      .get("/events")
      .pipe(map(response => response.body as Array<any>))
      .subscribe(
        events => {
          //console.log("events");
          this._event.next(events[0]);
          if(events[0]!=null){
            localStorage.setItem("event",JSON.stringify(events[0]));
            //console.log("setting");
          }
        },
        error => {
          this._event.error(error);
        }
      );

    return this.event;
  }

  createEvent(data: any): Observable<any> {
    this.backendServicesProxy
      .post("/events",data)
      .pipe(map(response => response.body as any))
      .subscribe(
        event => {
          //console.log("event posted");
          //console.log(event);
          if(event!=null){
            this.transactionLogService.fetchTransactions();
            localStorage.setItem("event",JSON.stringify(event));
            //console.log("setting");
          }
          var redirectUrl = '/event-created';
      // }
            this.router.navigateByUrl(redirectUrl);
        },
        error => {
          this._event.error(error);
        }
      );

    return this.event;
  }

  getArchivedEvents(): Observable<any> {
    return this.backendServicesProxy.get('/events/archive/')
    .pipe(map(response => response.body));
  }

}