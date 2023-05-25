import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { IAuthorization } from '../../utils/types';
import AuthorizationInput from '../../components/AuthorizationInput/AuthorizationInput';
import { ErrorModal } from '../../components';
import LoadingIcon from '../../assets/icons/LoadingIcon';

function SignUp({ active, setActive }: IAuthorization) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = (data: FieldValues) => {
    const { name, email, password } = data;
    (async () => {
      try {
        setPending(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = res;
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name,
          authProvider: 'local',
          email,
        });
        const token = await auth.currentUser?.getIdToken();
        localStorage.setItem('acces-token', token as string);
        navigate('/main');
      } catch (err) {
        setMessage((err as Error).message);
      } finally {
        setPending(false);
      }
    })();
  };

  return (
    <div className="authorization-page__layout">
      <h2 className="authorization-page__title">{t('signupLink')}</h2>
      <form
        className={`authorization-page__form ${pending ? 'authorization-page__form-pending' : ''}`}
        onSubmit={handleSubmit(handleRegister)}
      >
        <AuthorizationInput
          type="name"
          placeholder={t('namePlaceholder')}
          register={register('name', {
            required: `* ${t('nameWarning')}`,
            minLength: {
              value: 5,
              message: `* ${t('nameWarning2')}`,
            },
          })}
          onKeyUp={() => {
            trigger('name');
          }}
          message={errors.name?.message as string}
        />
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
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_+=`~])[A-Za-z\d@$!%*#?&-_+=`~]{8,}$/i,
              message: `* ${t('passwordWarning2')}`,
            },
            minLength: {
              value: 8,
              message: `* ${t('passwordWarning3')}`,
            },
            maxLength: {
              value: 20,
              message: `* ${t('passwordWarning4')}`,
            },
          })}
          onKeyUp={() => {
            trigger('password');
          }}
          message={errors.password?.message as string}
        />
        {pending ? (
          <LoadingIcon />
        ) : (
          <button className="authorization-page__form-button" type="submit">
            {t('signupLink')}
          </button>
        )}
      </form>
      {message && <ErrorModal message={message} setMessage={setMessage} />}
      <p className="authorization-page__text">
        {t('registerText4')}
        <button
          className="authorization-page__link"
          type="button"
          onClick={() => setActive(!active)}
        >
          {t('loginLink')}
        </button>
        {t('registerText3')}
      </p>
    </div>
  );
}

export default SignUp;
