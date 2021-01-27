import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';
import { login } from '../../modules/auth';
import { check } from '../../modules/user';
import { changeField, initializeForm } from '../../modules/form';

const LoginForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(
    ({ form, auth, user }: RootState) => ({
      form: form.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생', authError);
      setError('로그인 실패');
    } else {
      setError('');

      if (auth) {
        console.log('로그인 성공', auth);
        dispatch(check());
      }
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');

      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
