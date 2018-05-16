import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../services/thread.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  user: any = {};
  idSubject: string = "";
  idThread: string = "";
  thread: any = {};
  newReply: string;
  newPost: string;
  newTitle: string;
  isHidden: boolean = false;
  isThreadHidden: boolean = false;

  constructor(private threadsService: ThreadService,
              private route: ActivatedRoute,
              public session: SessionService,
              public router: Router,
  ) { }

  ngOnInit() {
    this.session.isLoggedIn().subscribe(user=>{
      this.user = user
    });
    this.route.params
    .subscribe((params) => {
      this.idSubject = params['idSubject'];
      this.idThread = params['idThread'];
      this.threadsService.getOneThread(this.idSubject, this.idThread).subscribe(thread => {
        this.thread = thread;
      })      
  })
  }

  submitForm(myForm){
    console.log(myForm);

    const reply ={
      content: myForm.value.content
    }
    this.threadsService.createReply(this.idSubject, this.idThread, reply).subscribe(thread => {
      this.threadsService.getOneThread(this.idSubject, this.idThread).subscribe(thread => {
        this.thread = thread;
        myForm.resetForm();
       
      }) 

    })
  }
  openEditThread(){
    this.isThreadHidden = !this.isThreadHidden;
 
  }

  editThread(idThread){
    this.isThreadHidden = !this.isThreadHidden;
    console.log(idThread);
    let update ={
      title: this.newTitle,
      content: this.newPost
    };
    console.log(update)
    this.threadsService.editeThread(idThread, update).subscribe(() => {
      this.threadsService.getOneThread(this.idSubject, this.idThread).subscribe(thread => {
        this.thread = thread;       
      }) 
    })
  }
  openEditReply(){
    this.isHidden = !this.isHidden;
 
  }

  editReply(idReplay){
    this.isHidden = !this.isHidden;
    console.log(idReplay);
    let update ={
      content: this.newReply
    };
    console.log(update)
    this.threadsService.editReplay(idReplay, update).subscribe(() => {
      this.threadsService.getOneThread(this.idSubject, this.idThread).subscribe(thread => {
        this.thread = thread;       
      }) 
    })
  }
}
