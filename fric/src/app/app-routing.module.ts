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
import { EventdetailedComponent } from './eventdetailed/eventdetailed.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ArchiveComponent } from './archive/archive.component';
import { EventCreatedComponent } from './event-created/event-created.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';
import { FindingDetailComponent } from './finding-detail/finding-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "event", component: EventComponent},
  {path: "event-created",component: EventCreatedComponent},
  {
    path: "system", 
    children: [
      { path: ":id",component: SystemDetailComponent},
      { path: "", component: SystemComponent}
    ],},
  {
    path: "tasks",
    children: [
      {path: "", component: TasksComponent},
      {path: ":id", component: TaskDetailComponent},
    ]},
  {path: "subtasks", component: SubtasksComponent},
  {
    path: "findings",
    children: [
      {path: "", component: FindingsComponent},
      {path: ":id", component: FindingDetailComponent}
    ]
  },
  {path: "archive", component: ArchiveComponent},
  {path: "configuration", component: ConfigurationComponent},
  {path: "setup", component: SetupComponent},
  {path: "help", component: HelpComponent},
  {path: "eventdetailed", component: EventdetailedComponent},
  {path: "add-event", component: AddEventComponent},
  {path: "add-task", component: AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
