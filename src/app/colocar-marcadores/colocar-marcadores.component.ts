import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-colocar-marcadores',
  templateUrl: './colocar-marcadores.component.html',
  styleUrls: ['./colocar-marcadores.component.css']
})
export class ColocarMarcadoresComponent implements OnInit {

  latitud: number;
  longitud: number;

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
  }

  crearUbicacion(){
    let Record = {};
    Record['latitud'] = this.latitud;
    Record['longitud'] = this.longitud;

    this.crudService.create_newUbication(Record).then(res =>{
      this.latitud = undefined;
      this.longitud = undefined;
      console.log(res);
    }).catch(error =>{
      console.log(error);
    })
  }
}
