import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any;
  mapLoader: MapsAPILoader;

  constructor() {}

  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      this.initGeocoder();
      return of(true);
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(), 
                lng: results[0].geometry.location.lng()
              });
            } else {
                console.error('Error - ', results, ' & Status - ', status);
                observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })        
      })
    )
  }
}
