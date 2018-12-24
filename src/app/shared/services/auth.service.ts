import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private afdb: AngularFireDatabase) {
    afAuth.authState.subscribe(res => {
      this.user = res;
    });
  }

  async signUp(data) {
     try {
    await this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
    await this.afAuth.auth.currentUser.updateProfile({displayName: data.name, photoURL: null});
    await this.afAuth.auth.currentUser.sendEmailVerification();
    if (data.collegeId === 'custom') {
      data.collegeId = (await this.afdb.list('colleges').push({name: data.collegeName})).key();
    }
    const uid = this.afAuth.auth.currentUser.uid;
    await this.afdb.object('users/' + uid).
    update({name: data.name, collegeId: data.collegeId, email: data.email, referrer: data.referrer, verified: false});
    await this.logOut();
    } catch (e) {
      throw new Error(e && e.message);
    }
  }

  async signIn(data) {
    try {
    await this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
      if (!this.afAuth.auth.currentUser.emailVerified) {
        await this.logOut();
       throw new Error('Please verify your email first!');
     }
     const userRef = (await this.afdb.object('users/' + this.user.uid).query.once('value')).val();
     if (!userRef.verified) {
        await this.afdb.object('users/' + this.user.uid).update({verified: true});
        await this.afdb.object('verifications/' + this.user.uid).set({verified: true});
     }
    } catch (e) {
      throw new Error(e && e.message);
    }
  }

  async logOut() {
    try {
      await this.afAuth.auth.signOut();
    } catch (e) {
      throw new Error('Sorry, an error occurred');
    }
  }

   async forgotPassword(email) {
     try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
     } catch (e) {
       throw new Error(e && e.message);
     }
  }

}
