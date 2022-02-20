import { db, auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  //最初のページ読み込み時一回だけ発火する。
  useEffect(() => {
    let unsubscribe;

    //もし、ユーザーがいるならユーザー名を取得。いなければnullを返す。
    if (user) {
      //ユーザーのユニークIDを取得(usernameを取得するため)
      const users = collection(db, "users");
      unsubscribe = getDocs(users).then((snapShot) => {
        snapShot.docs.map((doc) => {
          console.log(doc.data()?.username); //shincode
          setUsername(doc.data()?.username);
        });
      });
    } else {
      setUsername(null);
    }

    // console.log(user);
    // console.log(unsubscribe);
    return unsubscribe; //これ何が入ってる？
  }, [user]);

  return { user, username };
}
