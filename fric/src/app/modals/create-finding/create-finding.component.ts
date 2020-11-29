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
import { FindingService } from 'src/app/services/finding.service';
@Component({
  selector: 'create-finding',
  templateUrl: './create-finding.component.html',
  styleUrls: ['./create-finding.component.scss']
})
export class CreateFindingComponent implements OnInit {
  form: FormGroup = new FormGroup({
    f_name: new FormControl(''), //done
    f_description: new FormControl(''),//done
    f_long_description: new FormControl(''),//done
    f_host_name: new FormControl(''),//done
    f_ip_port: new FormControl(''),//done
    f_status: new FormControl(''),//done
    f_type: new FormControl(''),//done
    f_classification: new FormControl(''),//done
    f_confidentiality: new FormControl(''),//done
    f_integrity: new FormControl(''),//done
    f_availability: new FormControl(''),//done
    f_posture: new FormControl(''),//done
    f_relevance: new FormControl(''),//done
    f_countermeasure_effectiveness_rating: new FormControl(''),
    f_countermeasure_effectiveness_score: new FormControl(''),
    f_impact_desc: new FormControl(''),
    f_impact_level: new FormControl(''),
    f_cat_code: new FormControl(''),//done
    s_id: new FormControl(''),//done
    t_id: new FormControl(''),//on form
    st_id: new FormControl(''),//on form
  });
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  analystId: string;
  analsytInitials: string;
  eventId: string;
  eventTypes = ["Cooperative Vulnerability Penetration Assessment (CVPA)",
                "Cooperative Vulnerability Investigation (CVI)",
                "Verification of Fixes (VOF)"];

  classifications = ["Vulnerability","Informational"];
  cia = ["Yes","No"];
  statuses = ["Open","Closed"];
  types = [
    'Credentials Complexity',
    'Manufacturer Default',
    'Creds',
    'Lack of Authentication',
    'Plain Text Protocols',
    'Plain Text Web Login',
    'Encryption',
    'Authentication Bypass',
    'Port Security',
    'Access Control',
    'Least Privilege',
    'Privilege Escalation',
    'Missing Patches',
    'Physical Security',
    'Information Disclosure'
  ];
  posture = [
    'Insider',
    'Insider-Nearsider',
    'Nearsider',
    'Nearsider-Outsider',
    'Outsider'
  ];
  relevance = [
    'Confirmed',
    'Expected',
    'Anticipated',
    'Predicted',
    'Possible'
  ];
  catcodes = ["CAT I","CAT II","CAT III"];
  systems = [];
  tasks = [];
  subtasks = [];
  effectivenessRating = [
    "Very High",
    "High",
    "Medium",
    "Low",
    "Very Low"
  ];
  ratingScores = {
    "Very High":[10],
    "High":[9,8,7],
    "Medium":[6,5,4],
    "Low":[3,2,1],
    "Very Low":[0],
    "":[]
  }
  impactLevel = ['VH','H', 'M', 'L', 'VL', 'Information']

  

  constructor(private readonly systemService:SystemService,private readonly findingService:FindingService) {
    this.systemService.fetchSystems();
    this.systemService.allSystems.subscribe((systems) => {
      for(var sys of systems){
        var exists: boolean = false;
        for(var s of this.systems){
          if(s.s_id == sys.s_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.systems.push(sys);
        }
      }
      this.systems = [...this.systems];
      console.log(this.systems);
    });
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
    let findingJson = this.form.value;
    findingJson["f_archived"]=false;
    findingJson["t_id"]=this.eventId;
    findingJson["st_id"]=this.eventId;
    findingJson["e_id"]=this.eventId;
    findingJson["f_level"]="system";
    findingJson["f_evidence"]=[];
    findingJson["f_associations"]=[];
    findingJson["f_collaborators"]=[];
    findingJson["f_mitigations"]=[
      {
				"m_brief_description":"first",
				"m_long_description":"first mitigation"
			},
			{
				"m_brief_description":"second",
				"m_long_description":"second mitigation"
			}
    ];
    let request = {
      finding:findingJson,
      analyst:{
        a_id: this.analystId,
        a_initials: this.analsytInitials
      }
    }

    console.log(request);
    this.findingService.createFinding(request);
    this.modal.hide();
  }

}
