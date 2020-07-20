import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservice: AngularFirestore) { }

  create_newUbication(Record){
    return this.fireservice.collection('ubicacion').add(Record);
  }
}
