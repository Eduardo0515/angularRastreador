import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CrudService } from '../service/crud.service'

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  Ubicaciones: any;
  numero: number = 1;

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    this.obtenerUbicacion();
  }

  obtenerUbicacion() {
    this.crudService.get_Ubicaciones().subscribe(data => {
      this.Ubicaciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          numero: this.numero++,
          latitud: e.payload.doc.data()['latitud'],
          longitud: e.payload.doc.data()['longitud'],
          fecha: e.payload.doc.data()['fecha'],
        };
      })
    })
  }
}
