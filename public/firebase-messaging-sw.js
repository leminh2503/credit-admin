import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import Config from "../config";

const firebaseApp = initializeApp(Config.FIREBASE);

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
