import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { EnrollmentModel } from 'src/app/core/enrollment.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  public projectsRef: AngularFireList<ProjectModel>;
  public enrollmentsRef: AngularFireList<EnrollmentModel>;
  
  @Input() item;
  @Input() user;
  
  constructor(db: AngularFireDatabase) {
    this.projectsRef = db.list('/projects');
    this.enrollmentsRef = db.list('/enrollments');
  }

  deleteProject() {
    if(confirm("Are you sure you wanna delete " + this.item.title)){
      this.projectsRef.remove(this.item.key);
    }
    window.location.reload();
  }

  enrollUser() {
    if(this.item.numberOfVolunteers != 0) {
      let model = new EnrollmentModel();
      model.projectKey = this.item.key;
      model.volunteerEmail = this.user.email;
  
      this.projectsRef.update(this.item.key, {numberOfVolunteers: this.item.numberOfVolunteers-1});
      this.enrollmentsRef.push(model);
    } else {
      alert('This project is already at full capacity');
    }
  }

  ngOnInit() {
  }
}
