import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { VisualizarUbicacionMapaComponent } from './visualizar-ubicacion-mapa/visualizar-ubicacion-mapa.component';
import { ColocarMarcadoresComponent } from './colocar-marcadores/colocar-marcadores.component';

const routes: Routes =[
  
  {path: 'visualizar', component: VisualizarUbicacionMapaComponent},
  {path: 'insertar', component: ColocarMarcadoresComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
