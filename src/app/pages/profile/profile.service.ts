import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class ProfileService {
  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase, private afStorage: AngularFireStorage) {

  }
  updateProfileDatabase(data, uid) {
      return this.afDB.database.ref('users/' + uid ).update(data);
  }
  updateProfilePicture(image, uid) {
    const randomId = Math.random().toString(36).substring(2);
    return this.afStorage.storage.ref('profile-pictures/' + uid + '/' + randomId).put(image).then((res) => {
      return this.afStorage.ref('profile-pictures/' + uid + '/' + randomId).getDownloadURL().toPromise();
    })
    .then((url) => {
      const currentUser = this.afAuth.auth.currentUser;
      return currentUser.updateProfile({displayName: currentUser.displayName, photoURL: url}).then(res => url);
    });
  }
}
