import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput/AuthorizationInput';
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
  const { t } = useTranslation();

  const handleLogin = (data: FieldValues) => {
    (async () => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        const token = await auth.currentUser?.getIdToken();
        localStorage.setItem('acces-token', token as string);
        navigate('/main');
      } catch (err) {
        setMessage((err as Error).message);
      }
    })();
  };

  return (
    <div className="authorization-page__layout">
      <h2 className="authorization-page__title">{t('loginLink')}</h2>
      <form className="authorization-page__form" onSubmit={handleSubmit(handleLogin)}>
        <AuthorizationInput
          type="email"
          placeholder={t('emailPlaceholder')}
          register={register('email', {
            required: `* ${t('emailWarning')}`,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: `* ${t('emailWarning2')}`,
            },
          })}
          onKeyUp={() => {
            trigger('email');
          }}
          message={errors.email?.message as string}
        />
        <AuthorizationInput
          type="password"
          placeholder={t('passwordPlaceholder')}
          register={register('password', {
            required: `* ${t('passwordWarning')}`,
          })}
          onKeyUp={() => {
            trigger('password');
          }}
          message={errors.password?.message as string}
        />
        <button className="authorization-page__form-button" type="submit">
          {t('loginLink')}
        </button>
      </form>
      {message && <ErrorModal message={message} setMessage={setMessage} />}
      <Link className="authorization-page__link authorization-page__link-large" to="/reset">
        {t('forgotPassword')}
      </Link>
      <p className="authorization-page__text">
        {t('registerText')}
        <button
          className="authorization-page__link"
          type="button"
          onClick={() => setActive(!active)}
        >
          {t('registerText2')}
        </button>
        {t('registerText3')}
      </p>
    </div>
  );
}

export default LogIn;
