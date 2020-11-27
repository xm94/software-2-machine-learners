import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventdetailedComponent } from './eventdetailed/eventdetailed.component';
import { FindingsComponent } from './findings/findings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
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
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { NotificationModalComponent } from './notification-modal/notification-modal.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddEventComponent } from './add-event/add-event.component';
import { BackendServicesProxy } from './services/backend.service.proxy';
import { AddTaskComponent } from './add-task/add-task.component';
import { CreateEventModal } from './modals/create-event/create-event.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { EventCreatedComponent } from './event-created/event-created.component';
import { CreateSystemComponent } from './modals/create-system/create-system.component';


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    FindingsComponent,
    HomeComponent,
    FooterComponent,
    EventComponent,
    SystemComponent,
    TasksComponent,
    SubtasksComponent,
    ArchiveComponent,
    ConfigurationComponent,
    SetupComponent,
    HelpComponent,
    NotificationModalComponent,
    EventdetailedComponent,
    AddEventComponent,
    AddTaskComponent,
    CreateEventModal,
    EventCreatedComponent,
    CreateSystemComponent,
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
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSliderModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    ModalModule.forRoot(),
    MatDatepickerModule, 
    MatNativeDateModule
  ],entryComponents: [
    NotificationModalComponent,
  
 ],
  providers: [BackendServicesProxy],
  bootstrap: [AppComponent],
  exports: [
      MatDatepickerModule, 
      MatNativeDateModule 
  ]
})
export class AppModule { }
