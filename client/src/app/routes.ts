import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: AuthLoginComponent },
  { path: 'login',  component: AuthLoginComponent },
  { path: 'signup', component: AuthSignupComponent}
];