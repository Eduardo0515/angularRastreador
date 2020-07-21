import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { PubNubAngular } from 'pubnub-angular2';


@Component({
  selector: 'app-visualizar-ubicacion-mapa',
  templateUrl: './visualizar-ubicacion-mapa.component.html',
  styleUrls: ['./visualizar-ubicacion-mapa.component.css'],
  providers:[PubNubAngular]
})
export class VisualizarUbicacionMapaComponent implements OnInit {
  private mapa;
  pnChannel = "raspi-tracker";
  pubnub: PubNubAngular;
 
  urlOpenLayers = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
  urlAPIMapa = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

  constructor(pubnub: PubNubAngular) {
   
    this.pubnub = pubnub;
    this.pubnub.init({
      publishKey: 'pub-c-6e70a79c-7af6-4177-bfb5-b7eaf484a510',
      subscribeKey: 'sub-c-b1ea6414-c791-11ea-b3f2-c27cb65b13f4'
    });
    this.pubnub.subscribe({ channels: [this.pnChannel] });
  }

  ngOnInit(): void {
    this.inicializarMapa();
    this.pubnub.addListener({message: function(message){
      console.log(message);
    }})
    //this.ejecutar()
  }

  private cambiarPosMarcador = function(payload){
    let marcador = null;
    if (payload.message.lat) {
      var lat = payload.message.lat;
      var lng = payload.message.lng;
      if (this.marcador) {
        this.mapa.removeLayer(this.marcador);
      }
      console.log(payload);
      this.marcador = L.marker([lat, lng], {
        icon: this.iconoMarcador
      }).addTo(this.mapa);
    }
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([0, 0], 5);
    L.tileLayer(this.urlAPIMapa, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);
    
  }

  /*ejecutar = ()=>{
    var messages = this.pubnub.getMessage("raspi-tracker");
    console.log(messages);
  setInterval(this.ejecutar,10000);
  }*/


  

  medirDistancia() {
    var distance = this.mapa.distance([16.752706, -93.133080], [16.752434, -93.131710]);
    console.log(distance);
    console.log('Distancia 1');
  }

  iconoMarcador = L.icon({
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    iconUrl: 'assets/vaca.png'
  });
}
