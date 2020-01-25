import { Component } from '@angular/core';

// models
import { ProjectModel } from './core/project.model';
import { EnrollmentModel } from './core/enrollment.model';

// firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public projects: AngularFireList<ProjectModel>;
  public enrollments: AngularFireList<EnrollmentModel>;

  constructor(db: AngularFireDatabase) {
    this.projects = db.list('/projects');
    this.enrollments = db.list('/enrollments');
  }
}




