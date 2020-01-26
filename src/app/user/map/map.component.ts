import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { EnrollmentModel } from 'src/app/core/enrollment.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/core/project.model';
import { GeocodeService } from 'src/app/geocode.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  public enrollmentsRef: AngularFireList<EnrollmentModel>;
  public enrollments$: Observable<EnrollmentModel[]>;

  @ViewChild('mapElement', { static: false }) mapElement: any;
  map: google.maps.Map;

  address = 'London';
  location: Location;
  loading: boolean;

  public projectKeys: string[];
  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];

  constructor(
    db: AngularFireDatabase, private geocodeService: GeocodeService
  ) {
    this.enrollmentsRef = db.list('/enrollments');
    this.enrollments$ = this.enrollmentsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    
    this.projectsRef = db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.enrollments$.subscribe(result => {
      this.projectKeys = result.map(item => item.projectKey);
      this.projects$.subscribe(result => {
        this.projects = result.filter(item => {
          if (item.key) {
            this.addMarker(item.address, item)
            return this.projectKeys.includes(item.key)
          }
        });
      });
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  addMarker(location, item) {
    this.geocodeService.geocodeAddress(location)
      .subscribe((location) => {
        this.location = location;
        this.loading = false;
        this.map.setCenter(location);
        let marker = new google.maps.Marker({
          map: this.map,
          position: location
        });

        let infowindow = new google.maps.InfoWindow({
          content: `<h1> ${item.title} </h1> <p> ${item.description} </p> <b> ${item.address} </b> <div> <i> volunteers needed: ${item.numberOfVolunteers} </i> </div>`
        });

        marker.addListener('mouseover', function() {
          infowindow.open(this.getMap(), this);
        });

        marker.addListener('mouseout', function() {
          infowindow.close();
        });
      }
      );
  }

}
