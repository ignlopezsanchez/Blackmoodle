import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {routes} from './routes';


import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
