

//const VAPID_KEY ="BHmaLmnhZ_Q47hRVQ00IOL5hJAEJNNdKUkr7Rm-67P9b8jte4xxgWvxGRqbm0u_2tgvOcR5KlFp4ZkW_e9T7fwc";

import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const VAPID_KEY ="BHmaLmnhZ_Q47hRVQ00IOL5hJAEJNNdKUkr7Rm-67P9b8jte4xxgWvxGRqbm0u_2tgvOcR5KlFp4ZkW_e9T7fwc";

export const requestNotificationPermission = async () => {
  try {
    console.log("Requesting notification permission...");

    const permission = await Notification.requestPermission();

    console.log("Permission:", permission);

    if (permission !== "granted") {
      return null;
    }

    // Register Firebase service worker
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    console.log("Service worker registered:", registration);

    // Wait until service worker is ready
    await navigator.serviceWorker.ready;

    console.log("Getting FCM token...");

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    console.log("FCM Token generated successfully");

    return token;

  } catch (error) {
    console.error("FULL NOTIFICATION ERROR:", error);
    return null;
  }
};