importScripts ("https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js");
importScripts ("https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js");
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = getMessaging(firebaseApp);

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
// import { getMessaging, onMessage } from "firebase/messaging";

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('firebase-messaging-sw.js Received background message', payload);
  const notificationTitle = payload.data.title;
  const { body,icon,image } = payload.data

  const notificationOptions = {
    body : body,
    icon:icon,
    image: image
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
  // ...
});