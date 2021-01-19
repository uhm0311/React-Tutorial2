import * as ReduxActions from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = ReduxActions.createAction(
  START_LOADING,
  (requestType: string) => requestType
);

export const finishLoading = ReduxActions.createAction(
  FINISH_LOADING,
  (requestType: string) => requestType
);

type State = {
  [requestType: string]: boolean;
};

const initialState: State = {};

const loading = ReduxActions.handleActions<State, string>(
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
  initialState
);

export default loading;
