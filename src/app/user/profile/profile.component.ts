// import {} from 'googlemaps';

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/user.model';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel = new UserModel();
  profileForm: FormGroup;

  FilterTags = ['java', 'nancy', 'jquery'];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.displayName, this.user.email);
      }
    });
  }

  getUser() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user.providerData[0];
      }, err => {
        console.error(err);
      });
  }

  createForm(name: string, email?: string) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      email: [email]
    });
    this.profileForm.get('name').disable();
    this.profileForm.get('email').disable();
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        this.getUser();
      }, err => console.error(err))
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  openDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save(result);
    });
  }

}
