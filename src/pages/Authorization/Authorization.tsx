import { useState } from 'react';
import LogIn from '../../layouts/LogIn/LogIn';
import SignIn from '../../layouts/SignIn/SignIn';

function Authorization() {
  const [isBtnActive, setIsBtnActive] = useState(true);

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
            Log In
          </button>
          <button
            className="authorization-page__button"
            type="button"
            disabled={!isBtnActive}
            onClick={handleActiveBtn}
          >
            Sign In
          </button>
        </div>
        {isBtnActive ? (
          <LogIn active={isBtnActive} setActive={setIsBtnActive} />
        ) : (
          <SignIn active={isBtnActive} setActive={setIsBtnActive} />
        )}
      </div>
    </div>
  );
}

export default Authorization;
