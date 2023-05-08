import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput';
import { auth } from '../../utils/firebase';
import { ErrorModal } from '../../components';

function LogIn({ active, setActive }: IAuthorization) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (data: FieldValues) => {
    (async () => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigate('/');
      } catch (err) {
        setMessage((err as Error).message);
      }
    })();
  };

  return (
    <div className="login-layout">
      <p>Log In</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <AuthorizationInput
          type="email"
          placeholder="Email address"
          register={register('email', {
            required: 'Email is Required!!!',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          onKeyUp={() => {
            trigger('email');
          }}
          message={errors.email?.message as string}
        />
        <AuthorizationInput
          type="password"
          placeholder="Password"
          register={register('password', {
            required: 'You must specify a password',
          })}
          onKeyUp={() => {
            trigger('password');
          }}
          message={errors.password?.message as string}
        />
        <button type="submit">Log In</button>
      </form>
      {message && <ErrorModal message={message} />}
      <div>
        <Link to="/reset-email">Forgot Password</Link>
      </div>
      <div>
        Don&apos;t have an account?
        <button type="button" onClick={() => setActive(!active)}>
          Register
        </button>
        now.
      </div>
    </div>
  );
}

export default LogIn;
