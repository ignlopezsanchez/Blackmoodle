import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {}
  constructor(private service: SessionService) { }

  ngOnInit() {
    this.service.getProfile()
    .subscribe((profile) =>{
      this.profile = profile;
      console.log(this.profile)


    });
  }

}
