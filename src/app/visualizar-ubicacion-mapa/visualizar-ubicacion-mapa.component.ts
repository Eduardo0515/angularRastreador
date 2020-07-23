import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../service/crud.service'
import * as L from 'leaflet';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-visualizar-ubicacion-mapa',
  templateUrl: './visualizar-ubicacion-mapa.component.html',
  styleUrls: ['./visualizar-ubicacion-mapa.component.css'],
  providers: [PubNubAngular]
})

export class VisualizarUbicacionMapaComponent implements OnInit {
  public mapa;
  rango;
  latitudFuera;
  longitudFuera;
  marcador = null;
  MarcadorCentral: any;
  pubnub: PubNubAngular;
  pnChannel = "raspi-tracker";
  fecha: number = Date.now();
  fueraRango: boolean = false;
  marcadorExistente: boolean = false;
  urlAPIMapa = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

  constructor(pubnub: PubNubAngular, public crudService: CrudService) {
    this.pubnub = pubnub;
    this.pubnub.init({
      publishKey: 'pub-c-6e70a79c-7af6-4177-bfb5-b7eaf484a510',
      subscribeKey: 'sub-c-b1ea6414-c791-11ea-b3f2-c27cb65b13f4'
    });
  }

  ngOnInit(): void {
    this.inicializarMapa();
    this.cambiarPosicionMarcador();
    this.pubnub.subscribe({ channels: [this.pnChannel] });
    this.obtenerMarcador();
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([16.752769803087457, -93.11428070068361], 13);
    L.tileLayer(this.urlAPIMapa, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);
  }

  obtenerMarcador() {
    this.crudService.get_Marcador().subscribe(data => {
      this.MarcadorCentral = data.map(e => {
        return {
          id: e.payload.doc.id,
          latitud: e.payload.doc.data()['latitud'],
          longitud: e.payload.doc.data()['longitud'],
          distancia: e.payload.doc.data()['distancia'],
        };
      })
      if (this.MarcadorCentral.length == 1) {
        this.marcadorExistente = true
        var circle = L.circle([this.MarcadorCentral[0].latitud, this.MarcadorCentral[0].longitud], this.MarcadorCentral[0].distancia / 40, {
          color: 'orange'
        }).addTo(this.mapa);
        this.rango = L.circle([this.MarcadorCentral[0].latitud, this.MarcadorCentral[0].longitud], this.MarcadorCentral[0].distancia).addTo(this.mapa);
      }
    })
  }

  crearUbicacionGanadoAlejado() {
    let Ubicacion = {};
    Ubicacion['latitud'] = this.latitudFuera;
    Ubicacion['longitud'] = this.longitudFuera;
    Ubicacion['fecha'] = this.fecha;
    this.crudService.crearUbicacionFueraLimite(Ubicacion).then(res => {
    }).catch(error => {
      console.log(error);
    });
  }

  medirDistancia(lat, lng, latCircle, lngCircle) {
    var distance = this.mapa.distance([lat, lng], [latCircle, lngCircle]);
    return distance;
  }

  cambiarPosicionMarcador = function () {
    this.pubnub.addListener({
      message: (payload) => {
        if (payload.message.lat) {
          var lat = payload.message.lat;
          var lng = payload.message.lng;
          if (this.marcador) {
            this.mapa.removeLayer(this.marcador);
          }
          console.log(payload);
          this.marcador = L.marker([lat, lng], {
            icon: this.iconoMarcador
          }).bindPopup('Aquí').openPopup().addTo(this.mapa);
          if (this.marcadorExistente) {
            if (this.medirDistancia(lat, lng, this.rango.getLatLng().lat, this.rango.getLatLng().lng) <= this.rango.getRadius()) {
              this.rango.setStyle({
                color: 'green'
              });
              this.fueraRango = false;
            } else {
              this.latitudFuera = lat;
              this.longitudFuera = lng;
              this.rango.setStyle({
                color: 'red'
              });
              if (!this.fueraRango) {
                this.crearUbicacionGanadoAlejado();
                this.fueraRango = true;
              }
            };
          }

        }
      }
    });
  }

  iconoMarcador = L.icon({
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    iconUrl: 'assets/vaca.png'
  });
}
