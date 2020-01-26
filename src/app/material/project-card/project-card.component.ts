import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from 'src/app/core/project.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  public projectsRef: AngularFireList<ProjectModel>;
  
  @Input() item;
 
  constructor(db: AngularFireDatabase) {
    this.projectsRef = db.list('/projects');
  }

  deleteProject() {
    if(confirm("Are you sure you wanna delete " + this.item.title)){
      this.projectsRef.remove(this.item.key);
    }
    window.location.reload();
  }
  ngOnInit() {
  }
}
