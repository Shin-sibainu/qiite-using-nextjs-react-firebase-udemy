import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP2hZ9f1PR_e8WmMFzXZlfqhQ6UJSJmb0",
  authDomain: "nextshin-app.firebaseapp.com",
  projectId: "nextshin-app",
  storageBucket: "nextshin-app.appspot.com",
  messagingSenderId: "128310757541",
  appId: "1:128310757541:web:9677847991c159c716254c",
  measurementId: "G-YK2BKXW4LQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//firestore初期化
const db = getFirestore();

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const googleAuthProvider = new firebase.auth.GoodleAuthProvider();

export { auth, provider, db };
