import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        user.email = res.email;
        if(res.providerData[0].providerId == 'password'){
          user.photoURL = 'https://via.placeholder.com/400x300';
          user.displayName = res.displayName;
          user.providerId = res.providerData[0].providerId;
          return resolve(user);
        }
        else{
          user.photoURL = res.photoURL;
          user.displayName = res.displayName;
          user.providerId = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
