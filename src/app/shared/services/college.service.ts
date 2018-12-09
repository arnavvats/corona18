import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { eventData } from '../../shared/models/event-data.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private afStore: AngularFirestore, private afdb: AngularFireDatabase) {
  }
  getAllCollegeList() {
    if (!localStorage.getItem('collegeList')) {
    return this.afdb.object('colleges').valueChanges().pipe(map((res: any) => {
      let collegeList = [];
      const keys = Object.keys(res);
      keys.forEach(key => {
        collegeList.push({id: key, ...res[key]});
      });
      collegeList.sort(this.comparator);
      collegeList = collegeList.filter(doc => {
        return doc.id !== 'wTtnzl2oRu6A1MrIf606';
      });
      localStorage.setItem('collegeList', JSON.stringify(collegeList));
      return collegeList;
    }));
    }
    return of(JSON.parse(localStorage.getItem('collegeList')));
  }
  comparator(a , b) {
    return a.name.localeCompare(b.name);
  }
  getAmbassadorLeaderboard() {
    return this.afdb.object('leaderboard/ambassadors').query.once('value').then(res => {
      return res.val();
    });
  }
  getCollegeNameFromId(id) {
    return this.afStore.doc('colleges/' + id).get().pipe(map(res => {
      return res.data().name;
    }));
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
