import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { EnrollmentModel } from 'src/app/core/enrollment.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  public projectsRef: AngularFireList<ProjectModel>;
  public enrollmentsRef: AngularFireList<EnrollmentModel>;

  @Input() item;
  @Input() user;

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.projectsRef = db.list('/projects');
    this.enrollmentsRef = db.list('/enrollments');
  }

  deleteProject() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { title: this.item.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsRef.remove(this.item.key);
      }
    });
    // window.location.reload();
  }

  enrollUser() {
    if (this.item.numberOfVolunteers != 0) {
      let model = new EnrollmentModel();
      model.projectKey = this.item.key;
      model.volunteerEmail = this.user.email;

      this.projectsRef.update(this.item.key, { numberOfVolunteers: this.item.numberOfVolunteers - 1 });
      this.enrollmentsRef.push(model);
    } else {
      alert('This project is already at full capacity');
    }
  }

  ngOnInit() {
  }
}
