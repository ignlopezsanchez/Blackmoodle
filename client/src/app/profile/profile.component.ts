import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  user: any = {};
  constructor(private service: SessionService) { }

  ngOnInit() {
    this.service.isLoggedIn().subscribe(user => {
      this.user = user;
    })
    this.service.getProfile()
    .subscribe((profile) =>{
      this.profile = profile;
    });
  }

}
