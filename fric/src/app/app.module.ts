import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
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
import { MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule} from '@angular/material/menu';
import { NotificationModalComponent } from './notification-modal/notification-modal.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BackendServicesProxy } from './services/backend.service.proxy';
import { CreateEventModal } from './modals/create-event/create-event.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { EventCreatedComponent } from './event-created/event-created.component';
import { CreateSystemComponent } from './modals/create-system/create-system.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';
import { CreateFindingComponent } from './modals/create-finding/create-finding.component';
import { FindingDetailComponent } from './finding-detail/finding-detail.component';
import { CreateTaskComponent } from './modals/create-task/create-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CreateSubtaskComponent } from './modals/create-subtask/create-subtask.component';
import { SubtaskDetailComponent } from './subtask-detail/subtask-detail.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { AnalystProgressComponent } from './analyst-progress/analyst-progress.component';

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
    CreateEventModal,
    EventCreatedComponent,
    CreateSystemComponent,
    SystemDetailComponent,
    CreateFindingComponent,
    FindingDetailComponent,
    CreateTaskComponent,
    TaskDetailComponent,
    CreateSubtaskComponent,
    SubtaskDetailComponent,
    FileUploadComponent,
    TransactionModalComponent,
    AnalystProgressComponent,
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
    MatNativeDateModule,
    MatGridListModule
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
