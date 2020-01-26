import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../core/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
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
      label: 'Signed projects',
      path: './projects-signed-up-for',
      index: 2
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
