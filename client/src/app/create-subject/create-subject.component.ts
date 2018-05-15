import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  name: string = "";
  degree: any;
  course: number = 0;
  degrees: any = {};
  user: any = {};
  constructor(private subjectService: SubjectService, public session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn().subscribe(user=>{
      this.user = user
    });
    this.subjectService.getAllDegrees().subscribe(degrees => {
      this.degrees = degrees;
    })
    console.log(this.course)
  }

  submitForm(myForm){
    console.log(myForm);

    const subject ={
      name: myForm.value.name,
      degree:myForm.value.degree,
      course:myForm.value.course,

    }
    this.subjectService.createSubject(subject).subscribe()
  }

  
}
