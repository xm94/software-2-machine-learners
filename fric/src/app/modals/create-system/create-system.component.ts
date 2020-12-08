import {
  Directive,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
  concatMap,
  mapTo
} from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker/typings/datepicker-module';
import { MatNativeDateModule } from '@angular/material';
import { SystemService } from 'src/app/services/system.service';
import { TransactionLogService } from 'src/app/services/transaction-log.service';

@Component({
  selector: 'create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss']
})
export class CreateSystemComponent implements OnInit {
  form: FormGroup = new FormGroup({
    s_name: new FormControl(''), //done
    s_description: new FormControl(''), //done
    s_location: new FormControl(''),//done
    s_router: new FormControl(''),//done
    s_switch: new FormControl(''),//done
    s_room: new FormControl(''),//done
    s_test_plan: new FormControl(''),//done
    s_confidentiality: new FormControl(''),//done
    s_integrity: new FormControl(''),//done
    s_availability: new FormControl(''),//done
  });
  s_c = new FormControl(false);
  s_i = new FormControl(false);
  s_a = new FormControl(false);
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  analystId: string;
  analsytInitials: string;
  eventId: string;
  eventTypes = ["Cooperative Vulnerability Penetration Assessment (CVPA)",
                "Cooperative Vulnerability Investigation (CVI)",
                "Verification of Fixes (VOF)"];

  classifications = ["Top Secret",
    "Secret", "Confidential",
    "Classified", "Unclassified"]
  cia = ["Informational","Low","Medium","High"]


  constructor(private readonly systemService:SystemService,private readonly transactionLogService: TransactionLogService
    ) { }

  ngOnInit() {
  }
  onHide(): void {
    this.form.reset({
      name: '',
      text: '',
    });
    this.modal.hide();
  }

  showModal(user: any,e_id: string): void {
    console.log(user);
    this.analsytInitials = user.a_initials;
    this.analystId = user.a_id;
    this.eventId = e_id;
    this.modal.show();
  }

  submit(){
    console.log(this.form.value);
    console.log(this.eventId);
    let systemJson = this.form.value;
    systemJson["s_archived"]=false;
    systemJson["e_id"]=this.eventId;
    let request = {
      system:systemJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }

    console.log(request);
    this.systemService.createSystem(request);
    this.transactionLogService.fetchTransactions();
    this.modal.hide();
  }

}
