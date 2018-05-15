import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../services/thread.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private threadsService: ThreadService, private route: ActivatedRoute,public session: SessionService) { }

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
      // this.thread = thread;
      this.threadsService.getOneThread(this.idSubject, this.idThread).subscribe(thread => {
        this.thread = thread;
      }) 

    })
  }

}
