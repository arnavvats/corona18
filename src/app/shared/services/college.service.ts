import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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
}
