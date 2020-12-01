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
    console.log(localStorage.getItem("user"))
    let user = localStorage.getItem("user");
    return user ? JSON.parse(user) : this._currentUser;
  }

  private _currentUser;

  private _allAnalysts: Subject<any> = new BehaviorSubject([]);

  private setCurrentUser(response: HttpResponse<Object>){
    this._currentUser = response.body;
    console.log(this._currentUser);
    localStorage.setItem
    localStorage.setItem("user",JSON.stringify(response.body))
    console.log(localStorage.getItem("user"));
    return this.currentUser;
  }

  get allAnalysts() {
    //console.log('getting');
    //console.log(this._allSystems)
    return this._allAnalysts.asObservable();
  }

  userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  private setAllAnalysts(response: HttpResponse<Object>){
    this._allAnalysts.next(response.body);
    //console.log(this._allSystems);
    return this._allAnalysts;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}


  login(initials: string, lead: boolean): void {
    console.log("in login")
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.post('/login', {
      initials: initials.toUpperCase(),
      lead: lead
    });
    response.subscribe((r) => {
      console.log("in subscribr")
      console.log(r);
      var redirectUrl = '/';
      // }
      this.router.navigateByUrl(redirectUrl);
      return this.setCurrentUser(r)
    });
  }

  fetchAnalysts(): any[] {
    console.log("getting analysts");
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/analysts');
    response.subscribe((r) => {
        //console.log("in subscription");
        //console.log(r);
        this.setAllAnalysts(r);
        return r.body;
    })
    return []
  }

  getAnalysts(){
    return this.backendServicesProxy.get('/analysts/')
    .pipe(map(response => response.body));
  }
  getAnaylst(a_id: string): Observable<any> {
    return this.backendServicesProxy.get('/analysts/'+a_id)
    .pipe(map(response => response.body));
  }

}