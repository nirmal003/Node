import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          "BA1ElozbDnXmyy9dlvKbs4HhCirRs1lwQ1SWBfA2WyxlRkASaZQ60z4UVH7ihGnU1dU0kwLSRXvWTH0tl5mp93I",
      }).then((token) => {
        if (token) {
          console.log("token", token);

          localStorage.setItem("token", token);
          // fetch("http://localhost:4000/api/v1/send", {
          //   method: "POST",
          //   mode: "cors",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: { fcmToken: token },
          // });
        } else {
          console.log("can not get token");
        }
      });
    } else {
      console.log("do not have permission");
    }
  });
}

requestPermission();
