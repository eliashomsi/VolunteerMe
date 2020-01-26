import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../core/user.model';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  user;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user;
      }, err => {
        console.error(err);
      });
  }

}


