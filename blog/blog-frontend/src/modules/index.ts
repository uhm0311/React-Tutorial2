import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga, AuthState } from './auth';
import form, { FormState } from './form';
import loading, { LoadingState } from './loading';
import post, { PostState, writeSaga, readSaga } from './post';
import posts, { postsSaga, PostsState } from './posts';
import user, { userSaga, UserState } from './user';
import write, { WriteState } from './write';

export interface RootState {
  auth: AuthState;
  user: UserState;
  post: PostState;
  posts: PostsState;
  form: FormState;
  write: WriteState;
  loading: LoadingState;
}

const rootReducer = combineReducers<RootState>({
  auth,
  user,
  post,
  posts,
  form,
  write,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), readSaga(), writeSaga(), postsSaga()]);
}

export default rootReducer;
