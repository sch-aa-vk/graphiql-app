import { Link, useNavigate } from 'react-router-dom';
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
        <Link to="/" className="navigation__link">
          Welcome
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/workspace" className="navigation__link">
          Workspace
        </Link>
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
