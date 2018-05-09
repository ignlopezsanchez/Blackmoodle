import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${environment.BASEURL}/api/signup`
  });

  username: string;
  password: string;
  error: string;
  email: string;

  feedback: string;

  constructor(private service: SessionService, public router: Router) { }

  ngOnInit() {
    // this.uploader.onSuccessItem = (item, response) => {
    //   this.feedback = JSON.parse(response).message;
    // };

    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
  }

  signup(username, email, password) {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
    
    };
    this.service.signup(user)
      .catch(e => this.error = e)
      .subscribe(() => this.router.navigate(['login']));
  }

}