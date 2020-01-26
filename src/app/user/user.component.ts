import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('tabs', { static: false }) tabs: MatTabGroup;

  navLinks = [
    {
      label: 'Profile',
      path: './profile',
      index: 0
    }, {
      label: 'Created Projects',
      path: './projects-created',
      index: 1
    }, {
      label: 'Signed Projects',
      path: './projects-signed-up-for',
      index: 2
    },  {
      label: 'Projects Locations',
      path: './map',
      index: 3
    },
  ];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['user/profile']);
  }
}
