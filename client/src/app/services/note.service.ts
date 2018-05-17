import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class NoteService {

  options: object = {withCredentials:true};

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  createNote(idSubject, note) {
    return this.http.post(`${environment.BASEURL}/api/notes/${idSubject}/new`, note, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editeNote(idNote, update) {                                                                    //al ir ocn foto habra que cambiar
    return this.http.put(`${environment.BASEURL}/api/notes/${idNote}`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteNote(idSubject, idNote) {                                                                    
    return this.http.delete(`${environment.BASEURL}/api/notes/${idSubject}/${idNote}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
