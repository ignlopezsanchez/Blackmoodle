import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload';


import { SubjectService } from '../services/subject.service';
import { SessionService } from '../services/session.service';
import { DeadlineService } from '../services/deadline.service';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject: any = {};
  idSubject: string = "";
  uploader: FileUploader;
  
  
  user: any;
  name: string = "";
  date: Date;

  apuntes: any = {
    name: ""
  };
  constructor(private subjectService: SubjectService,
              private deadlineService: DeadlineService,
              private route: ActivatedRoute,
              public router: Router,
              private threadsService: ThreadService,
              public session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn().subscribe(user=>{
      this.user = user
    });
    this.route.params
    .subscribe((params) => {
      this.idSubject = params['idSubject'];
      this.uploader= new FileUploader({
        url: `${environment.BASEURL}/api/notes/${this.idSubject}/new`
      });
  });
  this.subjectService.getOneSubject(this.idSubject).subscribe(subject => {
    this.subject = subject;
  })   
  }

  createDeadline(){    
    const deadline = {
      name: this.name,
      date: this.date
    }
    this.deadlineService.createDeadline(this.idSubject, deadline).subscribe(() =>{
      this.subjectService.getOneSubject(this.idSubject).subscribe(subject => {
      this.subject = subject;
    })
    })
  }

  uploadNote() {   
    const note = {
      name: this.apuntes.name,      
    };
    
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('name', note.name);
      };  
      
      this.uploader.uploadAll(); 
      this.uploader.onCompleteItem = () => {
        this.subjectService.getOneSubject(this.idSubject).subscribe(subject => {
          this.subject = subject;
        })

      }                                                
  }

  leaveSubject(){
    this.subjectService.leaveSubject(this.idSubject).subscribe(() => {
      this.router.navigate([`/home`])
    })
  }

  submitForm(myForm){
    const newThread ={
      title: myForm.value.title,
      content: myForm.value.content
    }
    this.threadsService.createThread(this.idSubject, newThread).subscribe(() => {
      this.subjectService.getOneSubject(this.idSubject).subscribe(subject => {
        this.subject = subject;
        myForm.resetForm();
      }) 
      

    })
  }
}
