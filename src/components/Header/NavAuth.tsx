import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/firebase';

function NavAuth() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink to="/" className="navigation__link">
          Welcome
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/workspace" className="navigation__link">
          Workspace
        </NavLink>
      </li>
      <li className="navigation__item">
        <button
          type="button"
          className="navigation__link navigation__link-button"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </li>
    </ul>
  );
}

export default NavAuth;
