import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDoo9bsbh94HwmYWljuNkvpQOxw8u70ejo",
    authDomain: "asthra2k25-c08d4.firebaseapp.com",
    databaseURL: "https://asthra2k25-c08d4-default-rtdb.firebaseio.com",
    projectId: "asthra2k25-c08d4",
    storageBucket: "asthra2k25-c08d4.firebasestorage.app",
    messagingSenderId: "512470466855",
    appId: "1:512470466855:web:ba3ee8ee8bbf4146e62902",
    measurementId: "G-Z3BJBD11DB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
