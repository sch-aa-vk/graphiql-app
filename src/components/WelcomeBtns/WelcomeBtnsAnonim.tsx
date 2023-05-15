import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function WelcomeBtnsAnonim() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn" onClick={handleClick}>
        {`${t('loginLink')} / ${t('signupLink')}`}
      </button>
    </div>
  );
}

export default WelcomeBtnsAnonim;
