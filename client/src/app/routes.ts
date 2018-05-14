import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectComponent } from './subject/subject.component';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ProfileComponent },
  { path: 'subject/:idSubject', component: SubjectComponent },
  { path: 'login',  component: AuthLoginComponent },
  { path: 'signup', component: AuthSignupComponent}
];