import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '@core/interfaces/post';
import { UiService } from '@core/services/ui.service';
import { PostQuery } from '@core/states/post/post.query';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  private destroySubject$: Subject<void> = new Subject();
  public map: google.maps.Map;
  private marker: google.maps.Marker = null;
  private defaultCoordinates = new window.google.maps.LatLng(41.365462, 2.135936);
  private mapOptions: google.maps.MapOptions = {
    center: this.defaultCoordinates,
    zoom: 8,
    streetViewControl: false,
    mapTypeControl: false,
  };

  constructor(public uiService: UiService, private postQuery: PostQuery) { }

  ngOnInit(): void {
    this.setupPostListener();
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  private setupPostListener(): void {
    this.postQuery.selectedPost$.pipe(takeUntil(this.destroySubject$))
      .subscribe(post => {
        if (post) {
          if (this.marker) {
            this.cleanMarker();
          }
          this.setMarker(post);
        }
      });
  }

  private mapInitializer(): void {
    this.map = new window.google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  }

  private generateCoordinates(post: Post): google.maps.LatLng | null {
    console.log(parseFloat(post.lat.toString()), parseFloat(post.long.toString()));
    if (post && post.lat && post.long) {
      return new google.maps.LatLng(parseFloat(post.lat.toString()), parseFloat(post.long.toString()));
    } else {
      return this.defaultCoordinates;
    }
  }

  private generateMarker(post: Post): google.maps.Marker {
    return new window.google.maps.Marker({
      position: this.generateCoordinates(post),
      map: this.map,
    });
  }

  private setMarker(post: Post): void {
    const infowindow = new window.google.maps.InfoWindow();
    this.marker = this.generateMarker(post);
    google.maps.event.addListener(this.marker, 'click', () => {
      infowindow.setContent(this.generateInfoWindow(post));
      infowindow.open(this.map, this.marker);
    });
    this.map.setOptions({ center: this.generateCoordinates(post), zoom: 8, });
  }

  private generateInfoWindow(post: Post): string {
    let content = '';
    if (post) {
      if (post.title) {
        content += `<h2 style="margin-bottom: 10px;"><b>${post.title}</b></h2>`;
      }
      if (post.content) {
        content += `<p style="margin-bottom: 10px;">${post.content}</p>`;
      }
      if (post.image_url) {
        content += `<img style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;" src="${post.image_url}"/>`;
      }
    } else {
      content = 'No data';
    }
    return content;
  }

  private cleanMarker(): void {
    this.marker.setMap(null);
    this.marker = null;
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
