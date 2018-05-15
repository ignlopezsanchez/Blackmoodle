import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { ThreadsComponent } from './threads/threads.component';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent },
  { path: 'subject/:idSubject', component: SubjectComponent },
  { path: 'login',  component: AuthLoginComponent },
  { path: 'signup', component: AuthSignupComponent},
  { path: 'admin', component: CreateSubjectComponent},
  { path: 'threads/:idSubject/:idThread', component: ThreadsComponent}
];