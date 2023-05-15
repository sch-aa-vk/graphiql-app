import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavAnonim() {
  const { t } = useTranslation();

  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink to="/" className="navigation__link">
          {t('homeLink')}
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/auth" className="navigation__link">
          {`${t('loginLink')} / ${t('signupLink')}`}
        </NavLink>
      </li>
    </ul>
  );
}

export default NavAnonim;
