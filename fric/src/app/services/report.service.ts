import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServicesProxy } from './backend.service.proxy';
import { TransactionLogService } from './transaction-log.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private readonly backendServicesProxy: BackendServicesProxy,
    private readonly transactionLogService: TransactionLogService,
    private readonly router: Router) { }


  getRiskMatrix(e_id: string): Observable<any> {
    return this.backendServicesProxy.get('/riskmatrix/'+e_id)
    .pipe(map(response => response.body));
  }

  getERB(e_id: string): Observable<any> {
    return this.backendServicesProxy.get('/erb/'+e_id)
    .pipe(map(response => response.body));
  }
  getFinal(data): Observable<any> {
    return this.backendServicesProxy.post('/final/',data)
    .pipe(map(response => response.body));
  }
}
