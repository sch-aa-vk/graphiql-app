import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { INav } from '../../utils/types';

function NavAnonim({ onClick }: INav) {
  const { t } = useTranslation();

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
        <NavLink to="/auth" className="navigation__link" onClick={onClick}>
          {`${t('loginLink')} / ${t('signupLink')}`}
        </NavLink>
      </li>
    </ul>
  );
}

export default NavAnonim;
