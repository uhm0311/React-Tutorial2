import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import { INITIALIZE_FORM } from './form';
import { AxiosError } from 'axios';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const register = createAction(
  REGISTER,
  ({ username, password }: authAPI.AuthRequest) => ({
    username,
    password,
  }),
);

export const login = createAction(
  LOGIN,
  ({ username, password }: authAPI.AuthRequest) => ({
    username,
    password,
  }),
);

const registerSaga = createRequestSaga<
  authAPI.AuthRequest,
  authAPI.AuthResponse
>(REGISTER, authAPI.register);

const loginSaga = createRequestSaga<authAPI.AuthRequest, authAPI.AuthResponse>(
  LOGIN,
  authAPI.login,
);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

export interface AuthState {
  auth: null | authAPI.AuthResponse;
  authError: null | AxiosError;
}

type AuthPayload = null | AxiosError | authAPI.AuthResponse;

const initialState: AuthState = {
  auth: null,
  authError: null,
};

const auth = handleActions<AuthState, AuthPayload>(
  {
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth: auth as authAPI.AuthResponse,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      authError: authError as AxiosError,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth: auth as authAPI.AuthResponse,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      authError: authError as AxiosError,
    }),
  },
  initialState,
);

export default auth;
