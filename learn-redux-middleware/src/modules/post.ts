import * as ReduxActions from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

export const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export const getPost = createRequestThunk(GET_POST, api.getPost);

const initialState: Post | null = null;

const post = ReduxActions.handleActions<Post | null, Post>(
  {
    [GET_POST_SUCCESS]: (state, action) => action.payload,
  },
  initialState
);

export default post;
