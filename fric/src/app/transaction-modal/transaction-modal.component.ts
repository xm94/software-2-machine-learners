import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BackendServicesProxy } from '../services/backend.service.proxy'
import { AnalystService } from "../services/analyst.service"
import { TransactionLogService } from '../services/transaction-log.service';
import { CreateEventModal } from '../modals/create-event/create-event.component'

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
  providers: [BackendServicesProxy, TransactionLogService]
})
export class TransactionModalComponent implements OnInit {
  transaction: any;
  transactionList: any[]=[];
  stringify;
  
  constructor(
    private readonly transactionLogService: TransactionLogService,
  ) { 
    this.transactionLogService.fetchTransactions();
    this.transactionLogService.allTransactions.subscribe((transactions)=>{
      this.transactionList = transactions;
      console.log("PRINGTING");
      console.log(this.transactionList);
      this.stringify = JSON.stringify(this.transactionList);
    })
    console.log(this.transactionList)
  }

  ngOnInit() {
  }

}
