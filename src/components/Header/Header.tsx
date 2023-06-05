/* eslint-disable react/jsx-no-bind */
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import NavAuth from './NavAuth';
import NavAnonim from './NavAnonim';
import useStickyHeader from '../../hooks/useStickyHeader';
import { auth } from '../../utils/firebase';

function Header() {
  const [user] = useAuthState(auth);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const burgerMenu: MutableRefObject<HTMLElement | null> = useRef(null);

  const headerElemRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const headerClientHeight: number = (headerElemRef?.current as HTMLElement)?.clientHeight;
  const isSticky: boolean = useStickyHeader(headerClientHeight);
  const headersClassName = `header ${isSticky ? 'sticky' : ''}`;

  useEffect(() => {
    if (document.body.clientWidth < 768) {
      (document.querySelector('.app') as HTMLElement).style.overflow = 'hidden';
    }
  }, [isSticky]);

  function toggleBurgerMenu(): void {
    if (isBurgerMenuOpened) {
      burgerMenu.current?.classList.remove('opened');
      setIsBurgerMenuOpened(false);
      return;
    }

    burgerMenu.current?.classList.add('opened');
    setIsBurgerMenuOpened(true);
  }

  return (
    <header className={headersClassName} ref={headerElemRef}>
      <div className="wrapper">
        <div className="header__container">
          <NavLink to="/" className="header__logo">
            <h1 className="logo">
              <span className="logo__text">GraphiQL</span>
              <span className="logo__text">Countries</span>
            </h1>
          </NavLink>
          <nav className="header__nav navigation" ref={burgerMenu}>
            <button type="button" className="cross" aria-label="Close" onClick={toggleBurgerMenu}>
              &#215;
            </button>
            {user ? (
              <NavAuth onClick={toggleBurgerMenu} />
            ) : (
              <NavAnonim onClick={toggleBurgerMenu} />
            )}
          </nav>
          <button type="button" aria-label="Open" className="burger" onClick={toggleBurgerMenu}>
            <div className="burger__content">
              <span className="burger__line" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
