import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  (requestType: string) => requestType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType: string) => requestType,
);

export interface LoadingState {
  [requestType: string]: boolean;
}

const initialState: LoadingState = {};

const loading = handleActions<LoadingState, string>(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
