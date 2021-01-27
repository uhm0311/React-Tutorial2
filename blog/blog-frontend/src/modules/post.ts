import { createAction, handleActions } from 'redux-actions';
import { PostRequest } from '../lib/api/posts';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('post/WRITE_POST');

export const readPost = createAction(READ_POST, (id: string) => id);
export const unloadPost = createAction(UNLOAD_POST);

export const writePost = createAction(
  WRITE_POST,
  ({ title, body, tags }: PostRequest) => ({
    title,
    body,
    tags,
  }),
);

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* readSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

export interface PostState {
  post: null | postsAPI.PostResponse;
  postError: null | AxiosError;
}

type PostPayload = null | AxiosError | postsAPI.PostResponse;

const initialState: PostState = {
  post: null,
  postError: null,
};

const post = handleActions<PostState, PostPayload>(
  {
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post as postsAPI.PostResponse,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError: postError as AxiosError,
    }),
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post as postsAPI.PostResponse,
    }),
    [READ_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError: postError as AxiosError,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;
