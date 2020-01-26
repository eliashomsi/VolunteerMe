import { Component, OnInit } from '@angular/core';
import { ProjectModel} from '../core/project.model'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ExtractKeywords} from '../core/extractKeywords.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']

})
export class ProjectDetailsComponent  {
  name="george";
  tag=[]
  projectForm: FormGroup;
  public projectsRef: AngularFireList<ProjectModel>;
  public db: AngularFireDatabase;
  public tags: string[];
  public extractor: ExtractKeywords;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.extractor = new ExtractKeywords();
   }

   createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['',Validators.required],
      imageURL: ['',Validators.required],
      date: ['',Validators.required],
      volunteers:['',Validators.required],
      description:['',Validators.required],
      tag:[[],Validators.required],
      phoneNumber:['',Validators.required]
    });
  }

  addProject(value){
    value.tag = this.tag;
    console.log(value);

  }

  addtag(value){
    this.tag.push(value.tag)
    console.log(this.tag);
  }

  predictTags(event) {
    var smartTags = [];
    this.extractor.getKeywords(event.target.value, result => smartTags=result);
    this.tag = this.tag.concat(smartTags);
  }
}
