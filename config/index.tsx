// NAME
const STORE_NAME = "state";

// NETWORK
const NETWORK_CONFIG = {
  HOST: process.env.NEXT_PUBLIC_APP_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL + "/api",
  BASE_URL: process.env.NEXT_PUBLIC_WEB_URL,
  TIMEOUT: 30000,
  RETRY: false,
  DISPLAY_ERROR: process.env.NEXT_PUBLIC_DISPLAY_ERROR === "true",
  USE_TOKEN: true,
  WITH_METADATA: false,
};

// PATHNAME
const PATHNAME = {
  HOME: "/home",
  LOGIN: "/login",
};

// LAYOUT
const LAYOUT_CONFIG = {
  useSidebar: true,
  useNavbar: true,
  useFooter: false,
  useBottomNavigator: true,
};

// LANGUAGE
const LANGUAGE = {
  DEFAULT: "en",
};

// FIREBASE
// Also update firebase-messaging-sw.js file if update this value
const FIREBASE = {
  apiKey: "AIzaSyCKkv7LL9tO5D0U4Cnfi3CM-OFpuyseq_M",
  authDomain: "nextjs-core.firebaseapp.com",
  projectId: "nextjs-core",
  storageBucket: "nextjs-core.appspot.com",
  messagingSenderId: "905897922179",
  appId: "1:905897922179:web:b075e0fe50ba8bbafa15b6",
  measurementId: "G-ZDEHHJF4SZ",
};

export default {
  STORE_NAME,
  NETWORK_CONFIG,
  PATHNAME,
  LAYOUT_CONFIG,
  LANGUAGE,
  FIREBASE,
};
