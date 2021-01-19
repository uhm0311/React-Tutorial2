import * as Redux from "redux";
import counter from "./counter";
import post, { Post } from "./post";
import users, { User } from "./users";
import loading from "./loading";

export type RootState = {
  counter: number;
  post: Post | null;
  users: Array<User> | null;
  loading: {
    [requestType: string]: boolean;
  };
};

const rootReducer = Redux.combineReducers<RootState>({
  counter,
  post,
  users,
  loading,
});

export default rootReducer;
