//コンポーネント全体に共有して利用できる
import { createContext } from "react";

//まずはContextを作成する。
export const UserContext = createContext({
  user: null,
  username: null,
});
