function NavAuth() {
  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <a href="#main" className="navigation__link">
          Welcome
        </a>
      </li>
      <li className="navigation__item">
        <a href="#workspace" className="navigation__link">
          Workspace
        </a>
      </li>
      <li className="navigation__item">
        <a href="#out" className="navigation__link">
          Sign Out
        </a>
      </li>
    </ul>
  );
}

export default NavAuth;
