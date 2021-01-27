import { AxiosError } from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(
  TEMP_SET_USER,
  (user: authAPI.AuthResponse) => user,
);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga<void, authAPI.AuthResponse>(
  CHECK,
  authAPI.check,
);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

export interface UserState {
  user: null | authAPI.AuthResponse;
  checkError: null | AxiosError;
}

type UserPayload = null | AxiosError | authAPI.AuthResponse;

const initialState: UserState = {
  user: null,
  checkError: null,
};

const user = handleActions<UserState, UserPayload>(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user: user as authAPI.AuthResponse,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      checkError: null,
      user: user as authAPI.AuthResponse,
    }),
    [CHECK_FAILURE]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError: checkError as AxiosError,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);

export default user;
