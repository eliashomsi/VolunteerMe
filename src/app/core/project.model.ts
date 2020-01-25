export class ProjectModel {
  title: string;
  description: string;
  image: string;
  numberOfVolunteers: number;
  address: string;
  date: Date;
  phoneNumber: string;
  tags: string[];

  constructor(){
    this.image = "https://ahah/ahah.png";
    this.title = "DOMeGood";
    this.description = "MeDoGood";
    this.numberOfVolunteers = 10;
    this.address = "kidnapmestreet 19339";
    this.date = new Date(Date.now());
    this.phoneNumber = "666-666-6666";
    this.tags=[];
    this.tags.push("sampleTag");
  }
}
