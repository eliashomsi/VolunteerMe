import { Component } from '@angular/core';

import { projects } from '../sampleData/projects';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects = projects;

  share() {
    window.alert('The project has been shared!');
  }
}


