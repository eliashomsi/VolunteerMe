import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { rootRouterConfig } from './app.routes';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';

// User
import { UserResolver } from './user/user.resolver';

// Core
import { AuthGuard } from './core/auth.guard'
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

// Components
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/modules/material/material.module';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
=======
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

// font-awesome 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
>>>>>>> 50995e9c71d5740426d59cbe144fe6349a529620

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: ProjectListComponent },
      { path: 'profile', component: ProfileComponent }
    ]),
    BrowserAnimationsModule
=======
    MatCardModule,
    MaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
>>>>>>> 50995e9c71d5740426d59cbe144fe6349a529620
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProjectListComponent,
    ProfileComponent,
    ProjectDetailsComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }