import { auth, db, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { doc, writeBatch } from "firebase/firestore";

//[localhost:3000/enterのパスのときに反映される]
function EnterPage() {
  // const user = null;
  // const username = null;
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? ( //userはuseAuthStateでゲットできてる。
        !username ? ( //usernameがまだnullです。でも一回決めたらずっとあるからここにいかない病気
          <UsernameForm /> //ユーザ名だけ決まってないから打ち込んで(カスタムユーザー名)
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

//カスタムユーザーを決めるためのフォーム
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  //ここからユーザー名が被らないように設定したい

  const { user, username } = useContext(UserContext);

  //カスタムユーザー名で新規投稿
  const onSubmit = async (e) => {
    e.preventDefault();

    //指定した場所(コレクション階層)にuidとカスタムユーザー名を挿入したい
    const userDoc = doc(db, `users/${user.uid}`);
    const usernameDoc = doc(db, `usernames/${formValue}`);

    //まとめてデータに挿入する。
    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const inputValue = e.target.value;

    setFormValue(inputValue);

    /* あとで重複名前のチェック */
    // useEffect(() => {
    //   checkUsername(formValue);
    // }, formValue);
  };

  return (
    !username && (
      <section>
        <h3>ユーザ名を決めてください</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="あなたの名前"
            value={formValue}
            onChange={onChange}
          />
          <button type="submit" className="btn-green">
            決定
          </button>
        </form>
      </section>
    )
  );
}

export default EnterPage;
