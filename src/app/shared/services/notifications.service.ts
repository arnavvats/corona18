import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, combineLatest } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationsArray = new BehaviorSubject([]);
  constructor(private afMessaging: AngularFireMessaging,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth, private swUpdate: SwUpdate) {
       this.getPermission().then(res => {
          this.receiveMessage();
     });
     this.getNotificationsFromLocal();
    this.afMessaging.tokenChanges.pipe(combineLatest(this.afAuth.authState)).subscribe(res => {
      console.log(res);
      this.updateToken(res[0], res[1] && res[1].uid);
    });

    swUpdate.available.subscribe(event => {
        swUpdate.activateUpdate().then(() => document.location.reload());
    });
    window.addEventListener('focus', () => {
      this.getNotificationsFromLocal();
    });
   }
    async updateToken(token, uid) {
      const user = await this.afAuth.authState.pipe(take(1)).toPromise();
      await this.removeLastToken();
      await this.setCurrentToken(token, uid);
   }
   getPermission() {
    return this.afMessaging.requestPermission
    .toPromise().then(() => {
      console.log('Notification permission granted.');
      return this.afMessaging.getToken.toPromise();
    });
  }

  receiveMessage() {
     this.afMessaging.messages.subscribe((message: any) => {
       console.log(message);
      return this.
      pushNewNotificationIntoNotificationsArray
      ({title: message.notification.title, body: message.notification.body});
     });

  }

  async removeLastToken() {
    let lastToken = <any>localStorage.getItem('fcmToken');
    if (!lastToken) { return ; }
    lastToken = JSON.parse(lastToken);
    if (lastToken.type === 'unknown') {
      await this.afDB.database.ref('fcmTokenList/unknown' + lastToken.tokenValue).remove();
    } else if (lastToken.type === 'user') {
      await this.afDB.database.ref('fcmTokenList/users/' + lastToken.uid + '/' + lastToken.tokenValue).remove();
    }
    console.log('Last token removed', lastToken);
  }

  async setCurrentToken(value, uid) {
    const tokenData = {
      tokenValue: value,
      type: 'unknown',
      uid: null
      };
    if (uid) {
      tokenData.uid = uid;
      tokenData.type = 'user';
      await this.afDB.database.ref('fcmTokenList/users/' + uid + '/' + value).set(true);
    } else {
      await this.afDB.database.ref('fcmTokenList/unknown/' + value).set(true);
    }
     localStorage.setItem('fcmToken', JSON.stringify(tokenData));
     console.log('new token set', tokenData);
  }

  getNotificationsFromLocal() {
    const request = window.indexedDB.open('notifications', 1);
    request.onupgradeneeded = (e) => {
       const db = request.result,
       store = db.createObjectStore('notificationsStore', {autoIncrement: true});
    };
    request.onsuccess = (e) => {
      const db = request.result,
      tx = db.transaction('notificationsStore', 'readwrite'),
      store = tx.objectStore('notificationsStore'),
      notificationsFromLocal = store.getAll();
      notificationsFromLocal.onsuccess = (ev) => {
        this.notificationsArray.next(notificationsFromLocal.result);
        db.close();
      };
    };
  }
  saveNotificationToLocal(notification) {
    const request = window.indexedDB.open('notifications', 1);
    request.onupgradeneeded = (e) => {
       const db = request.result,
       store = db.createObjectStore('notificationsStore', {autoIncrement: true});
    };
    request.onsuccess = (e) => {
      const db = request.result,
      tx = db.transaction('notificationsStore', 'readwrite'),
      store = tx.objectStore('notificationsStore');
      store.put(notification).onsuccess = () => db.close();
    };
  }
  deleteNotificationsFromLocal() {
    const request = window.indexedDB.open('notifications', 1);
    request.onupgradeneeded = (e) => {
       const db = request.result,
       store = db.createObjectStore('notificationsStore', {autoIncrement: true});
    };
    request.onsuccess = (e) => {
      const db = request.result,
      tx = db.transaction('notificationsStore', 'readwrite'),
      store = tx.objectStore('notificationsStore');
      store.delete(IDBKeyRange.lowerBound(0)).onsuccess = () => db.close();
    };
  }

  pushNewNotificationIntoNotificationsArray(notification) {
   const val = this.notificationsArray.getValue();
   val.push(notification);
   this.notificationsArray.next(val);
   this.saveNotificationToLocal(notification);
  }
  // popNotificationsFromNotificationArray(start, end) {
  //   const val = this.notificationsArray.getValue();
  //   val.splice(start, end - start);
  //   this.notificationsArray.next(val);
  //   this.saveNotificationToLocal();
  // }
  clearNotificaitonArray() {
    this.notificationsArray.next([]);
    this.deleteNotificationsFromLocal();
  }
}
