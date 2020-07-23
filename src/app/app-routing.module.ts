import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { VisualizarUbicacionMapaComponent } from './visualizar-ubicacion-mapa/visualizar-ubicacion-mapa.component';
import { ColocarMarcadoresComponent } from './colocar-marcadores/colocar-marcadores.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes =[
  {path: '', redirectTo: '/visualizar', pathMatch: 'full'},
  {path: 'visualizar', component: VisualizarUbicacionMapaComponent},
  {path: 'insertar', component: ColocarMarcadoresComponent},
  {path: 'datosAlmacenados', component: AnalisisComponent},
  {path: 'mapa/:latitud/:longitud', component: MapaComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
