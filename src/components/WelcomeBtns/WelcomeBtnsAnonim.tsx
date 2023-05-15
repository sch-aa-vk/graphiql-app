<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

function WelcomeBtnsAnonim() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn" onClick={handleClick}>
        Sign in / Sign Up
=======
import { useTranslation } from 'react-i18next';

function WelcomeBtnsAnonim() {
  const { t } = useTranslation();

  return (
    <div className="auth-block">
      <button type="button" className="auth-block__btn">
        {t('loginLink')}
      </button>
      <button type="button" className="auth-block__btn">
        {t('signupLink')}
>>>>>>> 073bacc (feat: add translation to welcome page)
      </button>
    </div>
  );
}

export default WelcomeBtnsAnonim;
