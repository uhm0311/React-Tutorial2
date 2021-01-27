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
import { register } from '../../modules/auth';
import { changeField, initializeForm } from '../../modules/form';
import { check } from '../../modules/user';

const RegisterForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(
    ({ form, auth, user }: RootState) => ({
      form: form.register,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
    } else if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
    } else {
      dispatch(register({ username, password }));
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생', authError);
      if (authError.response?.status === 409) {
        setError('이미 존재하는 계정입니다.');
      } else {
        setError('회원가입 실패');
      }
    } else {
      setError('');

      if (auth) {
        console.log('회원가입 성공', auth);
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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
