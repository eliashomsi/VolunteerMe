import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProjectsCreatedComponent } from './user/projects-created/projects-created.component';
import { ProjectsSignedUpForComponent } from './user/projects-signed-up-for/projects-signed-up-for.component';
import { MapComponent } from './user/map/map.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'user', component: UserComponent, 
    children: [
      { path: 'profile', component: ProfileComponent, resolve: { data: UserResolver } },
      { path: 'projects-created', component: ProjectsCreatedComponent, resolve: { data: UserResolver }, },
      { path: 'projects-signed-up-for', component: ProjectsSignedUpForComponent, resolve: { data: UserResolver } },
      { path: 'map', component: MapComponent, resolve: { data: UserResolver }, }
    ]
  },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
];
