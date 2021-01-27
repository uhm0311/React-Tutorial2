import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POST');

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }: postsAPI.ListRequest) => ({ tag, username, page }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

export interface PostsState {
  posts: null | Array<postsAPI.PostResponse>;
  error: null | AxiosError;
  lastPage: number;
}

export type PostsPayload = Array<postsAPI.PostResponse> | AxiosError;

const initialState: PostsState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions<
  PostsState,
  PostsPayload,
  AxiosResponse<Array<postsAPI.PostResponse>>
>(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts: posts as Array<postsAPI.PostResponse>,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error as AxiosError,
    }),
  },
  initialState,
);

export default posts;
