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
    if(!localStorage.getItem('collegeList')) {
    return this.afStore.collection('colleges').get().toPromise().then(res => {
      let collegeList = res.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      }).sort(this.comparator);
      collegeList = collegeList.filter(doc => {
        return doc.id !== 'wTtnzl2oRu6A1MrIf606'
      });
      localStorage.setItem('collegeList', JSON.stringify(collegeList));
      return collegeList;
    });
    }
    return Promise.resolve(JSON.parse(localStorage.getItem('collegeList')));
  }
  comparator(a , b) {
    return a.name.localeCompare(b.name);
  }
  getAmbassadorLeaderboard() {
    if(!localStorage.getItem('leaderboard')) {
    return this.afStore.collection('leaderboard').doc('ambassadors')
    .get().toPromise().then(res => {
      localStorage.setItem('leaderboard',JSON.stringify(res.data().leaders))
      return res.data().leaders;
    });
    }
    return Promise.resolve(JSON.parse(localStorage.getItem('leaderboard')));
  }
  getCollegeNameFromId(id) {
    return this.afStore.doc('colleges/' + id).get().pipe(map(res => {
      return res.data().name;
    }));
  }

  getEventDataFromId(id) {
    if(!localStorage.getItem('events') || JSON.parse(localStorage.getItem('events'))['fest'] === undefined) {
    return this.setEventDataLocally().then(() => {
      const dataFromCache = JSON.parse(localStorage.getItem('events'));
      return dataFromCache[id];
    });
    }
    const dataFromCache = JSON.parse(localStorage.getItem('events'));
    return Promise.resolve(dataFromCache[id]);
  }
  setEventDataLocally() {
    return this.afStore.collection('events').get().toPromise().then(res => {
      let dataToStore = {};
      res.docs.forEach(doc => {
        dataToStore[doc.id] = doc.data();
      });
      console.log(dataToStore);
      localStorage.setItem('events', JSON.stringify(dataToStore));
        });
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
