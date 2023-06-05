import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import AuthorizationInput from '../../components/AuthorizationInput/AuthorizationInput';
import { ErrorModal } from '../../components';
import mail from '../../assets/icons/mail-reset.svg';
import LoadingIcon from '../../assets/icons/LoadingIcon';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleReset = (data: FieldValues) => {
    (async () => {
      try {
        setPending(true);
        await sendPasswordResetEmail(auth, data.email);
        setSuccess(true);
      } catch (err) {
        setMessage((err as Error).message);
      } finally {
        setPending(false);
      }
    })();
  };

  return (
    <div className="authorization-page">
      <div className="authorization-page__wrapper">
        <div className="authorization-page__decoration">
          <img className="authorization-page__decoration-image" src={mail} alt="" />
        </div>
        <p className="authorization-page__title">{t('resetText')}</p>
        <form
          className={`authorization-page__form ${
            pending ? 'authorization-page__form-pending' : ''
          }`}
          onSubmit={handleSubmit(handleReset)}
        >
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
          {pending ? (
            <LoadingIcon />
          ) : (
            <button className="authorization-page__form-button" type="submit">
              {t('resetText')}
            </button>
          )}
        </form>
        {message && <ErrorModal message={message} setMessage={setMessage} />}
        {success && (
          <p className="authorization-page__text">
            {t('resetText2')}
            <Link to="/auth" className="authorization-page__link">
              {t('resetText3')}
            </Link>
            {t('registerText3')}
          </p>
        )}
        <p className="authorization-page__text">
          {t('registerText')}
          <Link className="authorization-page__link" to="/auth">
            {t('registerText2')}
          </Link>
          {t('registerText3')}
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
