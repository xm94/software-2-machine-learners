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



    return this.currentUser;
  }

  userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}


  login(login: string, pass: string): Observable<any> {
    const response: Observable<
      HttpResponse<Object>
    > = this.backendServicesProxy.post('/auth/login', {
      login,
      password: pass
    });
    response.subscribe(() => {
      var redirectUrl = '/';
      // }
      this.router.navigateByUrl(redirectUrl);
    });

    return response.pipe(map(r => this.setCurrentUser(r)));
  }

}