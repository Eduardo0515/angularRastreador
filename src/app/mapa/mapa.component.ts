import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public mapa;
  marcador: { latitud: number, longitud: number };
  urlAPIMapa = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.marcador = {
      latitud: this.rutaActiva.snapshot.params.latitud,
      longitud: this.rutaActiva.snapshot.params.longitud
    }
    
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        var mark = L.marker([params.latitud, params.longitud]).addTo(this.mapa);
      }
    )
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([16.752769803087457, -93.11428070068361], 13);
    L.tileLayer(this.urlAPIMapa, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);
  }
}
