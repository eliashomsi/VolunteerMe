import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './material/modules/material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,    
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: ProjectListComponent },
      { path: 'project-details', component: ProjectDetailsComponent },
    ]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProjectListComponent,
    ProfileComponent,
    ProjectDetailsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


