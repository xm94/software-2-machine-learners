import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FindingComponent} from './finding/finding.component'


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "finding", component: FindingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
