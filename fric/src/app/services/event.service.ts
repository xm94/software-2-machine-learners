import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  

  private _allEvents: Subject<any> = new BehaviorSubject([]);

  private readonly _event: BehaviorSubject<any> = new BehaviorSubject([]);

  get allEvents() {
    console.log('getting');
    console.log(this._allEvents)
    return this._allEvents.asObservable();
  }

  get event(){
    console.log(localStorage.getItem("event"))
    return JSON.parse(localStorage.getItem("event"));
  }

  private setAllEvents(response: HttpResponse<Object>){
    this._allEvents.next(response.body);
    console.log(this._allEvents);
    return this._allEvents;
  }

  userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}


  fetchEvents(): any[] {
    console.log("getting event");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/events');
    response.subscribe((r) => {
        console.log("in subscription");
        console.log(r);
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
          console.log("events");
          this._event.next(events[0]);
          localStorage.setItem("event",JSON.stringify(events[0]));
          console.log(localStorage.getItem("event"));
        },
        error => {
          this._event.error(error);
        }
      );

    return this.event;
  }

}