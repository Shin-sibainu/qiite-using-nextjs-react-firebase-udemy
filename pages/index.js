import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      {/* <Link
        prefetch={false}
        href={{
          pathname: "/[username]",
          query: { usename: "shincode" },
        }}
      >
        <a>Shinのプロフィール</a>
      </Link> */}
      {/* <Loader show /> */}
      <button onClick={() => toast.success("hello toast!")}>Toast me</button>
    </div>
  );
}
