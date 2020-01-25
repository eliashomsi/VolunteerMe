import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ProjectModel} from '../core/project.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];

  constructor(db: AngularFireDatabase) {
    this.projectsRef = db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.projects$.subscribe(result => {this.projects = result; console.log(this.projects)});
  }
}


