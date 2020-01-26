import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/user.model';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { EnrollmentModel } from 'src/app/core/enrollment.model';

@Component({
  selector: 'app-projects-signed-up-for',
  templateUrl: './projects-signed-up-for.component.html',
  styleUrls: ['./projects-signed-up-for.component.css']
})
export class ProjectsSignedUpForComponent implements OnInit {
  public enrollmentsRef: AngularFireList<EnrollmentModel>;
  public enrollments$: Observable<EnrollmentModel[]>;
  public projectKeys: string[];

  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];

  public user: UserModel;

  constructor(
    db: AngularFireDatabase,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.enrollmentsRef = db.list('/enrollments');
    this.enrollments$ = this.enrollmentsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.projectsRef = db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.enrollments$.subscribe(result => {
      this.projectKeys = result.map(item => item.projectKey);
      this.projects$.subscribe(result => {
        this.projects = result.filter(item => {
         if (item.key) {
            return this.projectKeys.includes(item.key)
          }
        });
      });
    });
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }
}
