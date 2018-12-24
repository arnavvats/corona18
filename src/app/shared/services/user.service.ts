import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetail$ = new BehaviorSubject(null);
  public user$: Observable<firebase.User>;
  get uid()  {
    return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid;
  }
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private afdb: AngularFireDatabase) {
    if (this.uid) {
      this.getUserDetail(this.uid);
    }
    this.user$ = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserDetail(user.uid).then(res => this.userDetail$.next(res));
      } else {
        this.userDetail$.next(null);
      }
    });
  }
   getUserDetail(uid) {
    return this.afdb.object('users/' + uid).query.once('value').then(res => {
      return res.val();
    });
  }
  getUserInfo(uid) {
    return this.afdb.object('users/' + uid).query.once('value');
  }

  joinAmbassadorProgram() {
    if (this.uid) {
      return this.afdb.object('users/' + this.uid).update({
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
