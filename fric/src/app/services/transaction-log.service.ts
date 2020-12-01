import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy'

@Injectable({
  providedIn: 'root'
})
export class TransactionLogService {
  
  private _allTransactions: Subject<any> = new BehaviorSubject([]);

  get allTransactions(){
    return this._allTransactions.asObservable();
  }

  private setAllTransactions(response: HttpResponse<Object>){
    this._allTransactions.next(response.body);
    return this._allTransactions;
  }

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly router: Router
  ) {}

  fetchTransactions(): any[] {
    console.log("fetching transactions")
    const response: Observable<HttpResponse<Object>> = this.backendServicesProxy.get('/transactionlogs');
    response.subscribe((r)=>{
      this.setAllTransactions(r);
      return r.body;
    })
    return []
  }
}
