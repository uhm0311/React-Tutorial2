import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'form/CHANGE_FIELD';
export const INITIALIZE_FORM = 'form/INITIALIZE_FORM';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }: FormPayload) => ({
    form,
    key,
    value,
  }),
);

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form: string) => form,
);

export interface FormState {
  [form: string]: {
    [key: string]: string;
  };
}

interface FormPayload {
  form: string;
  key: string;
  value: string;
}

const initialState: FormState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
};

const form = handleActions<FormState, FormPayload | string>(
  {
    [CHANGE_FIELD]: (state, action) => {
      const { form, key, value } = action.payload as FormPayload;

      return produce(state, (draft) => {
        draft[form][key] = value;
      });
    },
    [INITIALIZE_FORM]: (state, action) => {
      const form = action.payload as string;

      return {
        ...state,
        [form]: initialState[form],
      };
    },
  },
  initialState,
);

export default form;
