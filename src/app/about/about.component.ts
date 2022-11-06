import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var ol: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  longitude: number =18.3890594417753 ;
  latitude: number = 43.85582653461914;
  
  map: any;

  email: string = '';
  name: string = '';
  message: string = '';

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name : ['', Validators.required],
      email: ['', Validators.required], 
      message: ['', Validators.required]
    });


    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 18
      })
    });
    this.addPoint(this.longitude, this.latitude);
    this.setCenter();
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/img/my-icon.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
    }

  onSubmit(){

  }

}
