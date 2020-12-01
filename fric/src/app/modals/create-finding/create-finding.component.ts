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
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component'
import { AnalystService } from 'src/app/services/analyst.service';
import { TaskService } from 'src/app/services/task.service';
import { SubtaskService } from 'src/app/services/subtask.service';
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
    f_evidence: new FormControl(),
    f_cat_code: new FormControl(''),//done
    s_id: new FormControl(''),//done
    t_id: new FormControl(''),//on form
    st_id: new FormControl(''),//on form
    a_id: new FormControl(''),
    f_collaborators: new FormControl(''),
    brief_mitigation: new FormControl(''),
    long_mitigation: new FormControl(''),
    f_associations: new FormControl(),
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
  analysts = [];
  findings = [];
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

  

  constructor(
    private readonly systemService: SystemService,
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
    private readonly findingService: FindingService,
    private readonly analystService: AnalystService) {
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
    this.analystService.fetchAnalysts();
    this.analystService.allAnalysts.subscribe((analysts) => {
      for(var analyst of analysts){
        var exists: boolean = false;
        for(var a of this.analysts){
          if(a.a_id==analyst.a_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.analysts.push(analyst);
        }
      }
      this.analysts = [...this.analysts];
    });
    this.taskService.allTasks.subscribe((tasks) => {
      for(var t of tasks){
        var exists: boolean = false;
        for(var task of this.tasks){
          if(task.t_id == t.t_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.tasks.push(t);
        }
      }
      this.tasks = [...this.tasks];
    });
    this.subtaskService.fetchSubtasks();
    this.subtaskService.allSubtasks.subscribe((subtasks) => {
      for(var subtask of subtasks){
        var exists: boolean = false;
        for(var st of this.subtasks){
          if(st.st_id==subtask.st_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.subtasks.push(subtask);
        }
      }
      this.subtasks = [...this.subtasks];
    });
    this.findingService.fetchFindings();
    this.findingService.allFindings.subscribe((findings) => {
      for(var finding of findings){
        var exists: boolean = false;
        for(var f of this.findings){
          if(f.f_id==finding.f_id){
            exists=true;
            break;
          }
        }
        if(!exists){
          this.findings.push(finding);
        }
      }
      this.findings = [...this.findings];
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

    let formData = new FormData();

    for(var key in this.form.value){
      if(key!="f_evidence"&&key!="f_collaborators"&&key!="f_associations"){
        console.log(key)
        console.log(this.form.get(key).value);
        formData.append(key,this.form.get(key).value)
      }
      else{
        console.log("multivalue");
        var multiValue = this.form.get(key).value;
        console.log(key);
        if(multiValue){
          for(var m of multiValue){
            console.log(m);
            formData.append(key,m)
          }
        }
      }
    }

    formData.append("f_archived","false")

    formData.append("e_id",this.eventId);

    formData.append("f_level","system");

    
    
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
    formData.append("f_mitigations",JSON.stringify({
      "m_brief_description":this.form.get("brief_mitigation").value,
      "m_long_description":this.form.get("long_mitigation").value
    }));

    formData.append("f_mitigations",JSON.stringify({
      "m_brief_description":this.form.get("brief_mitigation").value,
      "m_long_description":this.form.get("long_mitigation").value
    }));

    formData.append("analyst_id",this.analystId);
    formData.append("analyst_initials",this.analsytInitials);

    this.findingService.createFinding(formData);
    this.modal.hide();
  }

}
