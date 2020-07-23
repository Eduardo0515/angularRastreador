import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

//service
import {CrudService} from './service/crud.service';

//Leaflet
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

//Pubnub
import {PubNubAngular} from 'pubnub-angular2'; 

import { AppComponent } from './app.component';
import { VisualizarUbicacionMapaComponent } from './visualizar-ubicacion-mapa/visualizar-ubicacion-mapa.component';
import { AppRoutingModule } from './app-routing.module';
import { ColocarMarcadoresComponent } from './colocar-marcadores/colocar-marcadores.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { MapaComponent } from './mapa/mapa.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualizarUbicacionMapaComponent,
    ColocarMarcadoresComponent,
    AnalisisComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule,
    LeafletModule,
  ],
  providers: [CrudService,PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
