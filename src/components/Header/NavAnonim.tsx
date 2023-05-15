import { NavLink } from 'react-router-dom';

function NavAnonim() {
  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink to="/" className="navigation__link">
          Welcome
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/auth" className="navigation__link">
          Sign In / Sign Up
        </NavLink>
      </li>
    </ul>
  );
}

export default NavAnonim;
