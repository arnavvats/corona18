import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { eventData } from '../../shared/models/event-data.model';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private afStore: AngularFirestore) {
  }
  getAllCollegeList() {
    return this.afStore.collection('colleges').get()
    .pipe(map(res => {
      return res.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      }).sort(this.comparator);
    }));
  }
  comparator(a , b) {
    return a.name.localeCompare(b.name);
  }
  getAmbassadorLeaderboard() {
    return this.afStore.collection('leaderboard').doc('ambassadors')
    .get().pipe(map(res => {
      return res.data().leaders;
    }));
  }
  getCollegeNameFromId(id) {
    return this.afStore.doc('colleges/' + id).get().pipe(map(res => {
      return res.data().name;
    }));
  }

  getEventDataFromId(id) {
    return this.afStore.doc('events/' + id).get().toPromise();
  }

  checkIfRegistered(uid, eventId) {
    return this.afStore.doc('users/' + uid).get().toPromise().then((userData) => {
    if (userData.data().registrations && (userData.data().registrations.indexOf(eventId) !== -1)) {
      return true;
    }
    return false;
  });
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
}
