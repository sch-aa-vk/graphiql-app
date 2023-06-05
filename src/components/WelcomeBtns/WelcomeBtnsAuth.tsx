import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function WelcomeBtnsAuth() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn" onClick={handleClick}>
        {t('mainLink')}
      </button>
    </div>
  );
}

export default WelcomeBtnsAuth;
