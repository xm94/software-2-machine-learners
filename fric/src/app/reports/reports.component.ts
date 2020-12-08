import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnalystService } from '../services/analyst.service';
import { EventService } from '../services/event.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  event: any;
  analyst: any;
  erbGen = false;
  rmGen = false;
  finalGen = false;
  finalPosting = false;
  erbPath = ''
  rmPath = ''
  finalPath = ''
  form: FormGroup = new FormGroup({
    introduction: new FormControl(''), //done
    a_individuals: new FormControl(''), //done
    excutive_summary: new FormControl(''),//done
    arch_desc: new FormControl(''),//done
    ts_np: new FormControl(''),//done
    limitations: new FormControl(''),//done
    conclusion: new FormControl(''),//done
    d_list: new FormControl(''),
  });

  constructor(private readonly eventService: EventService,
    private readonly reportService: ReportService,
    private readonly analystService: AnalystService,
    ) {
      this.event = this.eventService.event;
      this.analyst = this.analystService.currentUser;
     }

  ngOnInit() {
  }

  erb(){
    this.reportService.getERB(this.event.e_id).subscribe((erbData)=>{
      console.log(erbData);
      this.erbPath=erbData.path;
      this.erbGen=true;
    })
  }

  riskMatrix(){
    this.reportService.getRiskMatrix(this.event.e_id).subscribe((rmData)=>{
      console.log(rmData);
      this.rmPath=rmData.path;
      this.rmGen=true;
    })
  }

  startFinal(){
    this.finalPosting=true;
  }

  submit(){
    console.log(this.form.value);
    console.log(this.event.e_id);
    let reportJson = this.form.value;
    reportJson["e_id"]=this.event.e_id;
    reportJson['acked_individuals']=reportJson['a_individuals'].split(';');
    reportJson['dist_list']=reportJson['d_list'].split(';');
    reportJson["acronyms"] = [
      {"acronym":"CCDC","def":"Combat Capabilities Development Command"},
      {"acronym":"DAC","def":"Data & Analysis Center"}
  ]
    let request = {
      template:reportJson,
      analyst:{
        a_id: this.analyst.a_id,
        a_initials: this.analyst.a_initials
      }
    }

    console.log(request);
    this.reportService.getFinal(request).subscribe((finalData)=>{
      console.log(finalData);
      this.finalPath=finalData.path;
      this.finalGen=true;
    })
    //this.systemService.createSystem(request);
    //this.modal.hide();
  }

}
