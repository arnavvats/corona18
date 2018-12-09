import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, mergeMap, flatMap } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private afMessaging: AngularFireMessaging,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth, private swUpdate: SwUpdate) {
       this.getPermission().then(res => {
          this.receiveMessage();
     });
    this.afMessaging.tokenChanges.subscribe(token => {
     this.updateToken(token);
    });
    swUpdate.available.subscribe(event => {
        swUpdate.activateUpdate().then(() => document.location.reload());
    });
   }
    updateToken(token) {
    return this.afAuth.authState.pipe(take(1)).toPromise().then((user => {
      if (!user) {   return this.afDB.list('unknownFcmTokens').push(token); }

      const data = { [user.uid]: token };
      return this.afDB.object('fcmTokens/').update(data);
    }));
   }
   getPermission() {
    return this.afMessaging.requestPermission
    .toPromise().then(() => {
      console.log('Notification permission granted.');
      return this.afMessaging.getToken.toPromise();
    }).then(token => {
        console.log(token);
        return this.updateToken(token);
      });
  }

  receiveMessage() {
     this.afMessaging.messages.subscribe(message => {
       console.log(message);
     });

  }
}
