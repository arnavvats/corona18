
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '1061210696578'
});

const messaging = firebase.messaging();
self.addEventListener('push', (message) => {
  const messageData = message.data.json();
  if(messageData.notification && messageData.notification.title &&  messageData.notification.body) {
    const body = {title: messageData.notification.title, body: messageData.notification.body};
    const request = indexedDB.open('notifications', 1);
    request.onupgradeneeded = () => {
      db.createObjectStore("notificationsStore", {autoIncrement: true});
    };
    request.onsuccess = (event) => {
      const db = event.target.result,
        tx = db.transaction('notificationsStore', 'readwrite'),
        store = tx.objectStore('notificationsStore'),
        notificationReq = store.put(body);
        notificationReq.onsuccess = (e) => {
          console.log('success');
        };
    };
  }
});
