import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetail;
  public user$: Observable<firebase.User>;
  get uid()  {
    return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid;
  }
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    if (this.uid) {
      this.getUserDetail(this.uid);
    }
    this.user$ = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserDetail(user.uid);
      }
    });
  }
  getUserDetail(uid) {
    this.afStore.collection('users').doc(uid).valueChanges().subscribe(res => {
      this.userDetail = res;
    });
  }
  joinAmbassadorProgram() {
    if (this.uid) {
      return this.afStore.collection('users').doc(this.uid).update({
        ambassador: {
          points: 0,
          rank: 0,
          count: 0
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
}
