import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SubjectService {

  options: object = {withCredentials:true};

constructor(private http: Http) { }

handleError(e) {
  return Observable.throw(e.json().message);
}

getAllSubjects() {                                                                //para el signup
  return this.http.get(`${environment.BASEURL}/api/subjects`, this.options)
    .map(res => res.json())
    .catch(this.handleError);
}

getOneSubject(idSubject) {
  return this.http.get(`${environment.BASEURL}/api/subjects/${idSubject}`, this.options)
    .map(res => res.json())
    .catch(this.handleError);
}

leaveSubject(idSubject) {
  return this.http.post(`${environment.BASEURL}/api/subjects/${idSubject}`, {}, this.options)
    .map(res => res.json())
    .catch(this.handleError);
}
getAllDegrees() {                                                               
  return this.http.get(`${environment.BASEURL}/api/subjects/degrees`, this.options)
    .map(res => res.json())
    .catch(this.handleError);
}
createSubject(subject) {
  return this.http.post(`${environment.BASEURL}/api/subjects/new`, subject, this.options)
    .map(res => res.json())
    .catch(this.handleError);
}
}
