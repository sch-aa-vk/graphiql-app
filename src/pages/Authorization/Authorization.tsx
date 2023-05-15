import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogIn, SignUp } from '../../layouts';

function Authorization() {
  const [isBtnActive, setIsBtnActive] = useState(true);
  const { t } = useTranslation();

  const handleActiveBtn = () => {
    setIsBtnActive(!isBtnActive);
  };

  return (
    <div className="authorization-page">
      <div className="authorization-page__wrapper">
        <div className="authorization-page__buttons-container">
          <button
            className="authorization-page__button"
            type="button"
            disabled={isBtnActive}
            onClick={handleActiveBtn}
          >
            <p className="authorization-page__button-text">{t('loginLink')}</p>
          </button>
          <button
            className="authorization-page__button"
            type="button"
            disabled={!isBtnActive}
            onClick={handleActiveBtn}
          >
            <p className="authorization-page__button-text">{t('signupLink')}</p>
          </button>
        </div>
        {isBtnActive ? (
          <LogIn active={isBtnActive} setActive={setIsBtnActive} />
        ) : (
          <SignUp active={isBtnActive} setActive={setIsBtnActive} />
        )}
      </div>
    </div>
  );
}

export default Authorization;
