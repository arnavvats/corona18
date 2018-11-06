import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user;
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
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
      data.collegeId = (await this.afStore.collection('colleges').add({name: data.collegeName})).id;
    }
    const uid = this.afAuth.auth.currentUser.uid;
    await this.afStore.collection('users').doc(uid).set({name: data.name, collegeId: data.collegeId, email: data.email});
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

}
