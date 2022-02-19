import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useEffect, useState } from "react";
//ユーザーログイン状態の取得
import { useAuthState } from "react-firebase-hooks/auth";

import { db, auth } from "../lib/firebase";
import { collection } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    //もし、ユーザーがいるならユーザー名を取得。いなければnullを返す。
    if (user) {
      console.log("user");
      //ユーザーのユニークIDを取得(usernameを取得するため)
      const ref = collection(db, "user");
      unsubscribe = ref.forEach((doc) => {
        console.log(doc);
        //ユーザー名取得
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    console.log(user);
    console.log(unsubscribe);
    return unsubscribe; //これ何が入ってる？
  }, user);

  return (
    <>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
