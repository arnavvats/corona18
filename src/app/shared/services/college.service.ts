import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { eventData } from '../../shared/models/event-data.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private afStore: AngularFirestore, private afdb: AngularFireDatabase, private afStorage: AngularFireStorage) {
  }
  getAmbassadorLeaderboard() {
    return this.afdb.object('leaderboard/ambassadors').query.once('value').then(res => {
      return res.val();
    });
  }
  getCollegeNameFromId(id) {
    return this.afdb.database.ref('colleges/' + id).once('value').then(res => res.val() && res.val().name);
  }

  getEventDataFromId(id) {
      return this.afdb.object('events/' + id).query.once('value').then((res) => res.val());
  }
  checkIfRegistered(uid, eventId) {
    return this.afdb.object('users/' + uid).query.once('value').then((userData) => {
      const result = userData.val();
    if (result.registrations && (result.registrations.indexOf(eventId) !== -1)) {
      return true;
    }
    return false;
  });
  }

  getEventNameFromId(id) {
    return this.afdb.database.ref('events/' + id + '/name').once('value').then(res => res.val());
  }
  async registUserForEvent(uid, eventId) {
    const userData = await this.afStore.doc('users/' + uid).get().toPromise();
    if (userData.data().registrations && (userData.data().registrations.indexOf(eventId) !== -1)) {
      throw new Error('Already registered!');
    }
    await this.afStore.doc('events/' + eventId).collection('registrations').doc(uid).set({verified: false});
      const data = userData.data();
      if (!data.registrations) {
        data.registrations = [eventId];
      } else {
        data.registrations.push(eventId);
      }
      await this.afStore.doc('users/' + uid).update(data);
    }
    getImageURL(eventId, posterId) {
      return this.afStorage.ref('posters/events/' + eventId + '/' + posterId).getDownloadURL();
    }

}
