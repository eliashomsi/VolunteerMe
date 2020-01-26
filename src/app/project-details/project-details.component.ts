import { Component, OnInit } from '@angular/core';
import { ProjectModel} from '../core/project.model'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ExtractKeywords} from '../core/extractKeywords.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']

})
export class ProjectDetailsComponent  {
  name="george";
  projectForm: FormGroup;
  public projectsRef: AngularFireList<ProjectModel>;
  public db: AngularFireDatabase;
  public tags: string[];
  public extractor: ExtractKeywords;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProjectDetailsComponent>) {
    this.createForm();
    this.tags = [];
    this.extractor = new ExtractKeywords();
   }

   createForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required ],
      address: ['',Validators.required],
      image: ['',Validators.required],
      date: ['',Validators.required],
      numberOfVolunteers:['',Validators.required],
      description:['',Validators.required],
      tags:[[],Validators.required],
      phoneNumber:['',Validators.required]
    });
  }

  addProject(value){
    value.tags = this.tags;
    if(value) {
      this.dialogRef.close(value);
    } else {
      this.dialogRef.close();
    }
  }

  clearTags() {
    this.tags = [];
  }

  addtag(value){
    this.tags.push(value.tags)
  }

  public predictTags(event) {
    this.extractor.getKeywords(event.target.value, result => this.tags = this.tags.concat(result));
  }
}
