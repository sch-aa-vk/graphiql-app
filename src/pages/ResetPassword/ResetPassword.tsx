import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import AuthorizationInput from '../../components/AuthorizationInput';
import { ErrorModal } from '../../components';
import mail from '../../assets/icons/mail-reset.svg';

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
    <div className="authorization-page">
      <div className="authorization-page__wrapper">
        <div className="authorization-page__decoration">
          <img className="authorization-page__decoration-image" src={mail} alt="" />
        </div>
        <p className="authorization-page__title">Reset Password</p>
        <form className="authorization-page__form" onSubmit={handleSubmit(handleReset)}>
          <AuthorizationInput
            type="email"
            placeholder="Email address"
            register={register('email', {
              required: '* Email is Required!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '* Invalid email address',
              },
            })}
            onKeyUp={() => {
              trigger('email');
            }}
            message={errors.email?.message as string}
          />
          <button className="authorization-page__form-button" type="submit">
            Reset email
          </button>
        </form>
        {message && <ErrorModal message={message} setMessage={setMessage} />}
        {success && <p>Please check your email to reset password</p>}
        <p className="authorization-page__text">
          Don&apos;t have an account?
          <Link className="authorization-page__link" to="/">
            Register
          </Link>
          now.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
