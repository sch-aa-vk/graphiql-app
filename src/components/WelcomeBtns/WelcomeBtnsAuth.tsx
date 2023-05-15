import { useTranslation } from 'react-i18next';

function WelcomeBtnsAuth() {
  const { t } = useTranslation();

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn">
        {t('mainLink')}
      </button>
    </div>
  );
}

export default WelcomeBtnsAuth;
