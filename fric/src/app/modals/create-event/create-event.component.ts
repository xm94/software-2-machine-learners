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
import { EventService } from 'src/app/services/event.service';
import { MatDatepickerModule } from '@angular/material/datepicker/typings/datepicker-module';
import { MatNativeDateModule } from '@angular/material';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventModal implements OnInit {
  form: FormGroup = new FormGroup({
    e_name: new FormControl(''), //done
    e_description: new FormControl(''), //done
    e_type: new FormControl(''), //done
    e_org_name: new FormControl(''), //done
    e_customer: new FormControl(''),//done
    e_customer_address: new FormControl(''),//done
    e_assessment_date: new FormControl(''),//done
    e_declassification_date: new FormControl(''),//done
    e_sec_class_title_guide: new FormControl(''),//done
    e_classification: new FormControl(''),//done
  });
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  analystId: string;
  analsytInitials: string;
  eventTypes = ["Cooperative Vulnerability Penetration Assessment (CVPA)",
                "Cooperative Vulnerability Investigation (CVI)",
                "Verification of Fixes (VOF)"];

  classifications = ["Top Secret",
    "Secret", "Confidential",
    "Classified", "Unclassified"]

  constructor(private readonly formBuilder: FormBuilder,private readonly eventService:EventService) {
   }

  ngOnInit() {
  }

  onHide(): void {
    this.form.reset({
      name: '',
      text: '',
    });
    this.modal.hide();
  }

  showModal(user: any): void {
    console.log(user);
    this.analsytInitials = user.a_initials;
    this.analystId = user.a_id;
    this.modal.show();
  }

  submit(){
    console.log(this.form.get("e_classification").value);
    let testJson = this.form.value;
    testJson["e_archived"]=false;
    testJson["e_version"]=1;
    let request = {
      event:testJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }
    console.log(request);
    this.eventService.createEvent(request);
    this.modal.hide();
    window.location.reload();
  }
}
