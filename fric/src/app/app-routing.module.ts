import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FindingsComponent} from './findings/findings.component'
import { EventComponent } from './event/event.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SetupComponent } from './setup/setup.component';
import { HelpComponent } from './help/help.component';
import { SystemComponent } from './system/system.component';
import { TasksComponent } from './tasks/tasks.component';
import { SubtasksComponent } from './subtasks/subtasks.component';


const routes: Routes = [
  {path: "event", component: EventComponent},
  {path: "system", component: SystemComponent},
  {path: "tasks", component: TasksComponent},
  {path: "subtasks", component: SubtasksComponent},
  {path: "findings", component: FindingsComponent},
  {path: "archive", component: EventComponent},
  {path: "configuration", component: ConfigurationComponent},
  {path: "setup", component: SetupComponent},
  {path: "help", component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
