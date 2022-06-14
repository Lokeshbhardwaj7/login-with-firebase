import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB7UKZtiQR2eY4rbOti0oBIiWuVl9xXwIY",
  authDomain: "push-notification-8ff69.firebaseapp.com",
  projectId: "push-notification-8ff69",
  storageBucket: "push-notification-8ff69.appspot.com",
  messagingSenderId: "518474807326",
  appId: "1:518474807326:web:4fb3b6b7654630dcb5560f"
 };   

 firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
 const messaging = getMessaging(firebase.initializeApp(firebaseConfig));
//  const messaging = firebase.messaging();
//  messaging.onBackgroundMessage(function(payload) {
// console.log("Received background message: ", payload);
// const notificationTitle = payload.notification.title;
// const notificationOptions = {
//   body: payload.notification.body,
// };
// self.ServiceWorkerRegistration.shwowNotification(notificationTitle, notificationOptions);
//  })
export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BGgIPEo5c_UUoWHSZo-Vif-g8jiN5bcw4e1HSy4sEM02GE3EFZF1Wut5oRO1_tR82B4i6C8JcDhHO3jTSb_2Mzs'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
 export {auth, googleAuthProvider};
