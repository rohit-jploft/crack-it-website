// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBtMnlIbzeOOTf8FdTLcaT5NwN9OSY6ZPk",
  authDomain: "crackit-770ca.firebaseapp.com",
  projectId: "crackit-770ca",
  storageBucket: "crackit-770ca.appspot.com",
  messagingSenderId: "864608849971",
  appId: "1:864608849971:web:4cc0d980a1be0cc7065346",
  measurementId: "G-05ZL1EJVPE",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
