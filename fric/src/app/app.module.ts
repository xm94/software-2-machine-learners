import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { FindingsComponent } from './findings/findings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SystemComponent } from './system/system.component';
import { TasksComponent } from './tasks/tasks.component';
import { SubtasksComponent } from './subtasks/subtasks.component';
import { ArchiveComponent } from './archive/archive.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SetupComponent } from './setup/setup.component';
import { HelpComponent } from './help/help.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    FindingsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    EventComponent,
    SystemComponent,
    TasksComponent,
    SubtasksComponent,
    ArchiveComponent,
    ConfigurationComponent,
    SetupComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
