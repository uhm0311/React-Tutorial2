import { AxiosError, AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga<Request, Response>(
  type: string,
  request: (argument: Request) => Promise<AxiosResponse<Response>>,
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: { type: string; payload: Request }) {
    yield put(startLoading(type));

    try {
      const response: AxiosResponse<Response> = yield call(
        request,
        action.payload,
      );

      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e as AxiosError,
        error: true,
      });
    }

    yield put(finishLoading(type));
  };
}
