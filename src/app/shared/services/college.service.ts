import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private afStore: AngularFirestore) { }
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
}
