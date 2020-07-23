import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VirtualTimeScheduler } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservice: AngularFirestore) { }

  crearNuevaMarcador(Marcador) {
    return this.fireservice.collection('MarcadorDistancia').add(Marcador);
  }

  get_Marcador() {
    return this.fireservice.collection('MarcadorDistancia').snapshotChanges();
  }

  eliminarMarcador(idMarcador) {
    this.fireservice.doc('MarcadorDistancia/' + idMarcador).delete();
  }

  crearUbicacionFueraLimite(ubicacion) {
    return this.fireservice.collection('ubicacion').add(ubicacion);
  }


  get_Ubicaciones() {
    return this.fireservice.collection('ubicacion').snapshotChanges();
  }
}
