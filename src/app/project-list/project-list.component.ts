import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ProjectModel } from '../core/project.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { UserModel } from '../core/user.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];
  public FilterTags: string[];
  public FilterInput: string;
  public user: UserModel;

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
      if (this.FilterTags.length == 0) {
        this.projects = result;
      } else {
        this.projects = result.filter(item => this.FilterTags.every(r => { if (r && item.tags) return item.tags.includes(r) }));
      }
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user;
      }, err => {
        console.error(err);
      });
  }

  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute) {
    this.FilterTags = [];
    this.renderWithFilters();
  }
}


