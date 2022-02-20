import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
// import { useEffect, useState } from "react";
//ユーザーログイン状態の取得
// import { useAuthState } from "react-firebase-hooks/auth";

// import { collection, getDocs } from "firebase/firestore";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  /* 最初はここに書いて、あとでhooks.jsに移動する。 */
  // const [user] = useAuthState(auth);
  // const [username, setUsername] = useState(null);

  // //最初のページ読み込み時一回だけ発火する。
  // useEffect(() => {
  //   let unsubscribe;

  //   //もし、ユーザーがいるならユーザー名を取得。いなければnullを返す。
  //   if (user) {
  //     //ユーザーのユニークIDを取得(usernameを取得するため)
  //     const users = collection(db, "users");
  //     unsubscribe = getDocs(users).then((snapShot) => {
  //       snapShot.docs.map((doc) => {
  //         console.log(doc.data().username); //shincode
  //         setUsername(doc.data().username);
  //       });
  //     });
  //   } else {
  //     setUsername(null);
  //   }

  //   // console.log(user);
  //   // console.log(unsubscribe);
  //   return unsubscribe; //これ何が入ってる？
  // }, [user]);

  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        {/* value={{ user, username }} */}
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
