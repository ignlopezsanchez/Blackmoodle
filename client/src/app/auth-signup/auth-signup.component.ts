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
  degree: string;
  course: number;
  idSubject: any;
  subjectsToJoin: any = [];
  subjectsToShow: any = [];
  degrees: any = {};
  user: any = {}

  constructor(private service: SessionService,
              public router: Router,
              private subjectService: SubjectService) { }

  ngOnInit() {
      this.subjectService.getAllSubjects().subscribe(subjects => {
        this.subjects = subjects;
        this.subjectService.getAllDegrees().subscribe(degrees => {
          this.degrees = degrees;
      })
      })
  
  }

  addSubject(){
    function uniq(a) {
      return Array.from(new Set(a));                          //remove duplicates
   }
   if (this.idSubject != undefined)
    {this.subjectsToJoin.push(this.idSubject);
    this.subjectsToJoin = uniq(this.subjectsToJoin);
    }
    this.subjectsToShow = this.subjectsToJoin.map(e => {
      for (let i = 0; i < this.subjects.length; i++) {
        if (e === this.subjects[i]._id){
          return this.subjects[i].name
      }
    
    }})
  }

  removeSubject(i){
    console.log(i)
    this.subjectsToJoin.splice(i, 1);
    


    
    this.subjectsToShow.splice(i,1);
  }

  signup() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      gender: this.gender,
      subjects: this.subjectsToJoin,
      birthDate: this.birthDate,
      isTeacher: this.isTeacher   
    };
        this.uploader.onBuildItemForm = (item, form) => {
          form.append('username', this.username);
          form.append('email', this.email);
          form.append('password', this.password);
          form.append('gender', this.gender);
          form.append('birthDate', this.birthDate);
          form.append('subjectsToParse', this.subjectsToJoin);
          form.append('isTeacher', this.isTeacher);
        };
    
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = () => {

          console.log(this.subjectsToJoin);

          this.router.navigate(['profile'])
        }     
        
        
     
  }
  

}