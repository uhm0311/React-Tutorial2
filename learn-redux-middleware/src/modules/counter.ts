import * as ReduxActions from "redux-actions";

const INCREASE: string = "counter/INCREASE";
const DECREASE: string = "counter/DECREASE";

export const increase = ReduxActions.createAction(INCREASE);
export const decrease = ReduxActions.createAction(DECREASE);

const initialState: number = 0;

const counter = ReduxActions.handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
