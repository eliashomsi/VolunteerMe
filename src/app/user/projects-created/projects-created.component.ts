import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/user.service';
import { FirebaseUserModel } from 'src/app/core/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-projects-created',
  templateUrl: './projects-created.component.html',
  styleUrls: ['./projects-created.component.css']
})
export class ProjectsCreatedComponent implements OnInit {
  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];
  public user: FirebaseUserModel;
  
  constructor(
    db: AngularFireDatabase,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.projectsRef = db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.projects$.subscribe(result => {
        this.projects = result.filter(item => item.ownerEmail == this.user.email);
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

  openDialog() {
      // const dialogRef = this.dialog.open(EditDialogComponent);
  
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed', result);
      // });
  }
}
