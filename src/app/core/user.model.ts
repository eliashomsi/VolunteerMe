export class FirebaseUserModel {
  key: string;
  photoURL: string;
  displayName: string;
  providerId: string;
  email: string;

  constructor(){
    this.key = "";
    this.photoURL = "";
    this.displayName = "";
    this.providerId = "";
    this.email = "";
  }
}
