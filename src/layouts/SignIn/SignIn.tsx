import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput';
import { ErrorModal } from '../../components';

function SignIn({ active, setActive }: IAuthorization) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (data: FieldValues) => {
    const { name, email, password } = data;
    (async () => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = res;
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name,
          authProvider: 'local',
          email,
        });
        navigate('/');
      } catch (err) {
        setMessage((err as Error).message);
      }
    })();
  };

  return (
    <div className="authorization-page__layout">
      <h2 className="authorization-page__title">Sign In</h2>
      <form className="authorization-page__form" onSubmit={handleSubmit(handleRegister)}>
        <AuthorizationInput
          type="name"
          placeholder="enter name"
          register={register('name', { required: 'Fullname is Required!!!' })}
          onKeyUp={() => {
            trigger('name');
          }}
          message={errors.name?.message as string}
        />
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
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              message: 'Password should contain at least one number and one special character',
            },
            minLength: {
              value: 8,
              message: 'Password must be more than 8 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password must be less than 20 characters',
            },
          })}
          onKeyUp={() => {
            trigger('password');
          }}
          message={errors.password?.message as string}
        />
        <button className="authorization-page__form-button" type="submit">
          Register
        </button>
      </form>
      {message && <ErrorModal message={message} setMessage={setMessage} />}
      <p className="authorization-page__text">
        Already have an account?
        <button
          className="authorization-page__link"
          type="button"
          onClick={() => setActive(!active)}
        >
          Login
        </button>
        now.
      </p>
    </div>
  );
}

export default SignIn;
