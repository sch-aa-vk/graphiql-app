import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../utils/firebase';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { INav } from '../../utils/types';

function NavAuth({ onClick }: INav) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
    onClick();
  };

  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <div className="language">
          <LanguageSelect />
        </div>
      </li>
      <li className="navigation__item">
        <NavLink to="/" className="navigation__link" onClick={onClick}>
          {t('homeLink')}
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/main" className="navigation__link" onClick={onClick}>
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
