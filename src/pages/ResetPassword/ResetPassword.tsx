import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import AuthorizationInput from '../../components/AuthorizationInput';
import { ErrorModal } from '../../components';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = (data: FieldValues) => {
    (async () => {
      try {
        await sendPasswordResetEmail(auth, data.email);
        setSuccess(true);
      } catch (err) {
        setMessage((err as Error).message);
      }
    })();
  };

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit(handleReset)}>
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
        <button type="submit">Send password reset email</button>
      </form>
      {message && <ErrorModal message={message} />}
      {success && <p>Please check your email to reset password</p>}
      <div>
        Don&apos;t have an account?
        <Link to="/">Register</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
