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
  public FilterTags: string[];
  public db: AngularFireDatabase;
  public FilterInput: string;

  public changeInput(event) {
    this.FilterTags.push(event.target.value);
    event.target.value = "";
    this.renderWithFilters();
  }

  removeFilter(event) {
    this.FilterTags = this.FilterTags.filter(item => item != event.target.name);
    this.renderWithFilters();
  }

  renderWithFilters() {
    this.projectsRef = this.db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.projects$.subscribe(result => {
      if(this.FilterTags.length == 0){
        this.projects = result;
      }else {
        this.projects = result.filter(item => item.tags.some(r=> this.FilterTags.includes(r)));
      }
    });
  }

  constructor(db: AngularFireDatabase) {
    this.db = db;
    this.FilterTags = [];
    this.renderWithFilters();
  }
}


