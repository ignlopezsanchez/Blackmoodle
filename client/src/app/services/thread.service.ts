import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ThreadService {

  options: object = {withCredentials:true};

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  createThread(idSubject, thread) {
    return this.http.post(`${environment.BASEURL}/api/threads/${idSubject}/new`, thread, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getOneThread(idSubject, idThread) {
    return this.http.get(`${environment.BASEURL}/api/threads/${idSubject}/${idThread}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editeThread(idThread, update) {
    return this.http.put(`${environment.BASEURL}/api/threads/${idThread}`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createReply(idSubject, idThread, reply) {
    return this.http.post(`${environment.BASEURL}/api/threads/${idSubject}/${idThread}/reply`, reply, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editeReplay(idReplay, update) {
    return this.http.put(`${environment.BASEURL}/api/threads/replies/${idReplay}`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
