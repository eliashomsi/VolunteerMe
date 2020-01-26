import {} from 'google-maps';
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
 /* backgroundURL=['url(https://images.unsplash.com/photo-1509664158680-07c5032b51e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)',
  "url(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)",
  "url(https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80)",
"url(https://images.unsplash.com/photo-1552154357-aaba12e68e64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)",]
*/
  // setMyStyles() {
    
  //   let styles = {
  //     'background-image': "url(https://images.unsplash.com/photo-1471286274405-579f8d7132d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)",
  //     'height': '100%'
  //   };
  //   return styles;
  // }
  
  public projects: AngularFireList<ProjectModel>;
  public enrollments: AngularFireList<EnrollmentModel>;

  constructor(db: AngularFireDatabase) {
    this.projects = db.list('/projects');
    this.enrollments = db.list('/enrollments');
  }
}




