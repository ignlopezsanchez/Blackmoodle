import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


// const BASEURL = 'http://localhost:3000';

@Injectable()
export class SessionService {

  user: any;
  options: object = {withCredentials:true};
  userEvent: EventEmitter<any> = new EventEmitter();


  constructor(private http: Http, public router: Router) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }
  handleUser(user?:object){
    this.user = user;
    // this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    this.handleUser(user);   
  }

  login(username, password) {
    return this.http.post(`${environment.BASEURL}/api/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${environment.BASEURL}/api/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
    this.router.navigate(['/login'])
    return this.http
      .get(`${environment.BASEURL}/api/logout`,  this.options)
      .map(res => res.json())
      .map(() => this.handleUser())
      .catch(this.handleError);
  }

  getProfile() {
    return this.http.get(`${environment.BASEURL}/api/profile`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  editProfile(update) {
    return this.http.put(`${environment.BASEURL}/api/profile`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }



}