import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class DeadlineService {

  options: object = {withCredentials:true};

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
  createDeadline(idSubject, deadline) {
    return this.http.post(`${environment.BASEURL}/api/deadlines/${idSubject}/new`, deadline, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editeDeadline(idSubject, idDeadline, update) {                                                                    
    return this.http.put(`${environment.BASEURL}/api/deadlines/${idSubject}/${idDeadline}`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
