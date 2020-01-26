import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/user.model';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { EnrollmentModel } from 'src/app/core/enrollment.model';
import { GeocodeService } from 'src/app/geocode.service';

@Component({
  selector: 'app-projects-signed-up-for',
  templateUrl: './projects-signed-up-for.component.html',
  styleUrls: ['./projects-signed-up-for.component.css']
})
export class ProjectsSignedUpForComponent implements OnInit {
  public enrollmentsRef: AngularFireList<EnrollmentModel>;
  public enrollments$: Observable<EnrollmentModel[]>;
  public projectKeys: string[];

  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];

  public user: UserModel;

  @ViewChild('mapElement', { static: false }) mapElement: any;
  map: google.maps.Map;

  address = 'London';
  location: Location;
  loading: boolean;

  constructor(
    db: AngularFireDatabase,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef
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

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }
}
