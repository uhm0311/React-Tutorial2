import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }: WritePayload) => ({ key, value }),
);

export interface WriteState {
  title: string;
  body: string;
  tags: Array<string>;
}

export interface WritePayload {
  key: string;
  value: string | Array<string>;
}

const initialState: WriteState = {
  title: '',
  body: '',
  tags: new Array<string>(),
};

const write = handleActions<WriteState, WritePayload>(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
  },
  initialState,
);

export default write;
