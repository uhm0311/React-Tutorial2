import * as ReduxActions from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

export const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

export type User = {
  id: number;
  username: string;
  email: string;
};

export const getUsers = createRequestThunk(GET_USERS, (_) => api.getUsers());

const initialState: Array<User> | null = null;

const users = ReduxActions.handleActions<Array<User> | null, Array<User>>(
  {
    [GET_USERS_SUCCESS]: (state, action) => action.payload,
  },
  initialState
);

export default users;
