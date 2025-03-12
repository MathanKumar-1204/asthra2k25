import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBdlRlUlJOIeQmdXrSg1WCaQDELows1aI8",
  authDomain: "easemind-7eadb.firebaseapp.com",
  databaseURL: "https://easemind-7eadb-default-rtdb.firebaseio.com",
  projectId: "easemind-7eadb",
  storageBucket: "easemind-7eadb.appspot.com",
  messagingSenderId: "952327177059",
  appId: "1:952327177059:web:f57c7089b6ffde073fc956",
  measurementId: "G-KWMRGSHF5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
