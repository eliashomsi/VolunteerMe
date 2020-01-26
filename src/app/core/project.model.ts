export class ProjectModel {
  key: string;
  title: string;
  description: string;
  image: string;
  numberOfVolunteers: number;
  address: string;
  date: Date;
  phoneNumber: string;
  tags: string[];
  ownerEmail: string;

  constructor(){
    this.key = "";
    this.title = "";
    this.description = "";
    this.image = "";
    this.numberOfVolunteers = 0;
    this.address = "";
    this.phoneNumber = "";
    this.date = new Date(Date.now());
    this.tags=[];
    this.tags.push("sampleTag");
    this.ownerEmail = "";
  }
}
