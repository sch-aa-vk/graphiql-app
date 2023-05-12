import { Link } from 'react-router-dom';

function NavAnonim() {
  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <Link to="/" className="navigation__link">
          Welcome
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/auth" className="navigation__link">
          Sign In / Sign Up
        </Link>
      </li>
    </ul>
  );
}

export default NavAnonim;
