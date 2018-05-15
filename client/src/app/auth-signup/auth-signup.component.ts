import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { SubjectService } from '../services/subject.service';


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
  gender: string;
  birthDate: Date;
  isTeacher: boolean = false;
  subjects: any = {};
  feedback: string;
  subjectsToJoin: any = [];

  constructor(private service: SessionService,
              public router: Router,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getAllSubjects().subscribe(subjects => {
      this.subjects = subjects;
      console.log(subjects)


    })
    // this.uploader.onSuccessItem = (item, response) => {
    //   this.feedback = JSON.parse(response).message;
    // };

    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
  }

  signup() {
    console.log(this.gender)
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      gender: this.gender,
      birthDate: this.birthDate,
      isTeacher: this.isTeacher   
    };
    console.log(this.isTeacher)
        this.uploader.onBuildItemForm = (item, form) => {
          form.append('username', this.username);
          form.append('email', this.email);
          form.append('password', this.password);
          form.append('gender', this.gender);
          form.append('birthDate', this.birthDate);
          form.append('isTeacher', this.isTeacher);
        };
    
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = () => {

          this.router.navigate(['profile'])
        }     
        
        
     
  }

}