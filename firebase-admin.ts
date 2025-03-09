/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceKey = require("@/service_key.json");

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey)
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
