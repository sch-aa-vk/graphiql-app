import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../utils/firebase';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

function NavAuth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <div className="language">
          <LanguageSelect />
        </div>
      </li>
      <li className="navigation__item">
        <NavLink to="/" className="navigation__link">
          {t('homeLink')}
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/main" className="navigation__link">
          {t('workLink')}
        </NavLink>
      </li>
      <li className="navigation__item">
        <button
          type="button"
          className="navigation__link navigation__link-button"
          onClick={handleLogout}
        >
          {t('signoutLink')}
        </button>
      </li>
    </ul>
  );
}

export default NavAuth;
