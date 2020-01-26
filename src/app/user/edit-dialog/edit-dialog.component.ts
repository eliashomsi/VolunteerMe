import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/user.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  profileForm: FormGroup;
  user: UserModel;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.user = this.data['user']
    this.profileForm = this.fb.group({
      name: [this.user.displayName, Validators.required ],
      email: [this.user.email]
    });    
  }

  onSave(value?) {
    if(value) {
      this.dialogRef.close(value);
    } else {
      this.dialogRef.close();
    }
  }

}
