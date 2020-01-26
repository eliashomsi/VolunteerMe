import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  editState: boolean;

  FilterTags = ['java', 'nancy', 'jquery']

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.editState = false;
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name, this.user.email);
      }
    })
  }

  createForm(name: string, email?: string) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ],
      email: [email]
    });
    this.profileForm.get('name').disable();
    this.profileForm.get('email').disable();
  }

  save(value){
    this.editToggle();
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.error(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['login']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  editToggle() {
    this.editState = !this.editState;

    let control = this.profileForm.get('name')
    control.disabled ? control.enable() : control.disable();
    control = this.profileForm.get('email')
    control.disabled ? control.enable() : control.disable();
  }

  openDialog(user: FirebaseUserModel): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
