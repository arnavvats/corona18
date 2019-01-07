import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private afDb: AngularFireDatabase) { }
  getPackages() {
    return this.afDb.database.ref('packages').once('value').then(res => {
      const packs = res.val();
      return Object.keys(packs).map(packId => {
        return {id: packId, ...packs[packId]};
      });
    });
  }

}
