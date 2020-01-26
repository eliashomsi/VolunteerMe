import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsComponent } from 'src/app/project-details/project-details.component';

@Component({
  selector: 'app-projects-created',
  templateUrl: './projects-created.component.html',
  styleUrls: ['./projects-created.component.css']
})
export class ProjectsCreatedComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
      const dialogRef = this.dialog.open(ProjectDetailsComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
  }

}
