import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetail;
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
        this.getUserDetail(user.uid);
      }
    });
  }
   getUserDetail(uid) {
    this.afdb.object('users/' + uid).valueChanges().subscribe(res => {
      this.userDetail = res;
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
