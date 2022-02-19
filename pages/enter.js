import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

import { useContext } from "react";
import { UserContext } from "../lib/context";

function EnterPage() {
  // const user = null;
  // const username = null;
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm /> //ユーザ名だけ決まってないから打ち込んで
        ) : (
          <SignOutButton /> //ユーザー情報もあるし、ユーザ名もちゃんと決まってるよ
        )
      ) : (
        <SignInButton /> //ユーザー情報が全くないからサインインしてね
      )}
    </main>
  );
}

//グーグルボタンでサインイン
function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <p>グーグルでログイン</p>
    </button>
  );
}

//グーグルでサインアウト
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
}

function UsernameForm() {
  return null;
}

export default EnterPage;
