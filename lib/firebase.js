import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";

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

export { auth, provider, db };

//SSRのときに実装。ログインしてユーザープロフィール設定のときに実装する。
/**
 * ユーザー名を指定すると,users/{uid}が取得できる
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = await getDocs(q).then((snapshot) => {
    // console.log(snapshot);
    snapshot.forEach((doc) => {
      console.log(doc);
      return doc;
    });
  });

  // console.log(userDoc);
  // return userDoc;
}
