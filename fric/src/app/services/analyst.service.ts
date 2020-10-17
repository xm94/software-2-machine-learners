import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy'

@Injectable({
  providedIn: 'root'
})
export class AnalystService {
  get currentUser() {
    return this._currentUser;
  }

  private _currentUser;

  private setCurrentUser(response: HttpResponse<Object>){
    this._currentUser = response.body;
    console.log(this._currentUser);


    return this.currentUser;
  }

  userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}


  login(initials: string, lead: boolean): Observable<any> {
    console.log("in login")
    const response: Observable<
      HttpResponse<Object>
    > = this.backendServicesProxy.post('/login', {
      initials: initials,
      lead: lead
    });
    response.subscribe(() => {
      console.log("in subscribr")
      var redirectUrl = '/';
      // }
      this.router.navigateByUrl(redirectUrl);
    });
    var test;
    response.pipe(map(r => test=r));
    console.log(test)
    return response.pipe(map(r => this.setCurrentUser(r)));
  }

}