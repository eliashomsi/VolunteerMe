import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProfileComponent } from './profile/profile.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'profile', component: ProfileComponent,  resolve: { data: UserResolver}},
  { path: 'project-list', component: ProjectListComponent},
  { path: 'project-details', component: ProjectDetailsComponent },
];
