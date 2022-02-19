import Link from "next/link";
//ここでグローバルに共有されたContextを使う
import { useContext } from "react";
import { UserContext } from "../lib/context";

function Navbar() {
  // const user = null;
  // const username = null;

  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Kiite</button>
          </Link>
        </li>

        {/* if Login */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">投稿する</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* if not Login */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">ログイン</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
