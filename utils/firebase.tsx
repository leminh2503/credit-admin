import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getPerformance} from "firebase/performance";
import Config from "@app/config";

if (typeof window !== "undefined") {
  const app = initializeApp(Config.FIREBASE);
  getAnalytics(app);
  getPerformance(app);
}
