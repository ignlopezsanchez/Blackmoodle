import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {routes} from './routes';
import { FileSelectDirective } from "ng2-file-upload";



import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { HttpModule } from '@angular/http';
import { ThreadService } from './services/thread.service';
import { DeadlineService } from './services/deadline.service';
import { NoteService } from './services/note.service';
import { SubjectService } from './services/subject.service';
import { ProfileComponent } from './profile/profile.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { ThreadsComponent } from './threads/threads.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    FileSelectDirective,
    ProfileComponent,
    SubjectComponent,
    CreateSubjectComponent,
    ThreadsComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
  ],
  providers: [SessionService, ThreadService, DeadlineService, NoteService, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
