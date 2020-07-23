import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-colocar-marcadores',
  templateUrl: './colocar-marcadores.component.html',
  styleUrls: ['./colocar-marcadores.component.css']
})
export class ColocarMarcadoresComponent implements OnInit {
  mapa;
  Marcador: any;
  marcador = null;
  latitud: number;
  longitud: number;
  distancia: number;
  idMarcador: number;
  isMarcadorGuardadoBD: boolean = false;
  permitirColocarMarcador: boolean = true;
  isMarcadorColocadoMapa: boolean = false;
  urlAPIMapa = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.agregarQuitarMarcadorClick();
    this.obtenerMarcador();
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([16.752769803087457, -93.11428070068361], 13);
    L.tileLayer(this.urlAPIMapa, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);
    this.mapa.doubleClickZoom.disable();
  }

  obtenerMarcador() {
    this.crudService.get_Marcador().subscribe(data => {
      this.Marcador = data.map(e => {
        return {
          id: e.payload.doc.id,
          latitud: e.payload.doc.data()['latitud'],
          longitud: e.payload.doc.data()['longitud'],
          distancia: e.payload.doc.data()['distancia'],
        };
      })
      if (this.Marcador.length == 1) {
        this.marcador = L.marker([this.Marcador[0].latitud, this.Marcador[0].longitud], {
          icon: this.iconoMarcador
        })
          .bindPopup('Aquí').openPopup();
        this.mapa.addLayer(this.marcador);
        this.distancia = this.Marcador[0].distancia;
        this.idMarcador = this.Marcador[0].id;
        this.isMarcadorGuardadoBD = true;
        this.permitirColocarMarcador = false;
      }
    })
  }

  crearMarcador() {
    let Marcador = {};
    Marcador['latitud'] = this.latitud;
    Marcador['longitud'] = this.longitud;
    Marcador['distancia'] = this.distancia;
    this.crudService.crearNuevaMarcador(Marcador).then(res => {
      this.latitud = undefined;
      this.longitud = undefined;
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
    this.router.navigate(['/visualizar']);
    console.log('Marcador creado');
  }

  eliminarMarcador() {
    this.mapa.removeLayer(this.marcador);
    this.permitirColocarMarcador = true;
    this.crudService.eliminarMarcador(this.idMarcador);
    this.isMarcadorColocadoMapa = false;
    this.isMarcadorGuardadoBD = false;
    this.distancia = undefined;
    console.log('Marcador eliminado');
  }

  agregarQuitarMarcadorClick() {
    this.mapa.on('dblclick', e => {
      let latitudLongitud = this.mapa.mouseEventToLatLng(e.originalEvent);

      if (this.isMarcadorColocadoMapa) {
        this.mapa.removeLayer(this.marcador);
        this.isMarcadorColocadoMapa = false;

      } else if (!this.isMarcadorColocadoMapa && this.permitirColocarMarcador) {
        this.latitud = latitudLongitud.lat;
        this.longitud = latitudLongitud.lng;
        this.marcador = L.marker([latitudLongitud.lat, latitudLongitud.lng], {
          icon: this.iconoMarcador
        })
          .addTo(this.mapa);
        this.isMarcadorColocadoMapa = true;
      }
    })
  }

  iconoMarcador = L.icon({
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    iconUrl: 'assets/marcador.png'
  });
}
