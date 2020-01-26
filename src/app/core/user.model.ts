export class FirebaseUserModel {
  photoURL: string;
  displayName: string;
  providerId: string;
  email: string;

  constructor(){
    this.photoURL = "";
    this.displayName = "";
    this.providerId = "";
    this.email = "";
  }
}
