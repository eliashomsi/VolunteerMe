import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ProjectModel} from '../core/project.model'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public projects: AngularFireList<ProjectModel>;

  constructor(db: AngularFireDatabase) {
    this.projects = db.list('/projects');
  }
}


