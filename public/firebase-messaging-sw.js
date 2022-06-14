// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB7UKZtiQR2eY4rbOti0oBIiWuVl9xXwIY",
   authDomain: "push-notification-8ff69.firebaseapp.com",
   projectId: "push-notification-8ff69",
   storageBucket: "push-notification-8ff69.appspot.com",
   messagingSenderId: "518474807326",
   appId: "1:518474807326:web:4fb3b6b7654630dcb5560f"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
