import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public user$: BehaviorSubject<User | null>;
  constructor(private afAuth: AngularFireAuth, private afdb: AngularFireDatabase, private httpClient: HttpClient) {
    this.user$ = new BehaviorSubject(null);
    afAuth.authState.subscribe(res => {
      this.user = res;
      this.user$.next(this.user);
    });
  }

  checkEmailAddressValidity(email) {
    return this.httpClient.get('https://open.kickbox.com/v1/disposable/' + email).toPromise()
            .then(res => {
              if (res && res['disposable'] === true) {
                throw new Error('This seems to be a disposable email address.');
              }
            });
  }

  async signUp(data) {
     try {
    await this.checkEmailAddressValidity(data.email);
    await this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
    await this.afAuth.auth.currentUser.updateProfile({displayName: data.name, photoURL: null});
    await this.afAuth.auth.currentUser.sendEmailVerification();
    const uid = this.afAuth.auth.currentUser.uid;
    if (data.collegeId === 'nitp') {
      data.collegeName = 'National Institute of Technology, Patna';
    }
    await this.afdb.object('users/' + uid).
    update(
      {name: data.name, collegeId: data.collegeId, email: data.email,
        referrer: data.referrer, verified: false, collegeName: data.collegeName});
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
  async resendVerificationMail(data) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
      if (this.afAuth.auth.currentUser.emailVerified === true) {
        throw new Error('Your email has already been verified. You have been signed in.');
      }
      await this.afAuth.auth.currentUser.sendEmailVerification();
      await this.logOut();
    } catch (e) {
      throw new Error(e && e.message);
    }
  }

}
