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
  public user$ = new BehaviorSubject(null);
  get uid() {
    return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid;
  }
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private afdb: AngularFireDatabase) {
    if (this.uid) {
      this.getUserDetail();
    }
    this.afAuth.authState.subscribe(user => {
      this.user$.next(user);
      if (user) {
        this.afdb.object('users/' + user.uid).query.once('value').then(res => {
          this.userDetail$.next({uid: user.uid, ...res.val()});
        });
        this.getUserDetail().then(res => this.userDetail$.next(res));
      } else {
        this.userDetail$.next(null);
      }
    });
  }

   getUserDetail() {
    return new Promise((res, rej) => {
        const sub = this.afAuth.authState.subscribe(user => {
          if (!user) {
             res(null);
          } else {
            this.afdb.database.ref('users/' + user.uid).once('value').then(data => {
              res({uid: user.uid, ...data.val()});
            }).catch(e => {
              res(null);
            });
          }
        });
    });
  }
  getUserInfo(uid) {
    return this.afdb.database.ref('users/' + uid).once('value').then(this.success).then(res => {
      return {uid, ...res};
    });
  }

  getUserNameFromUid(uid) {
    return this.afdb.database.ref('users/' + uid + '/name').once('value').then(res => res.val());
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
  success(data) {
    return data.val();
  }
}
