import { MutableRefObject, useRef, useState } from 'react';
import NavAuth from './NavAuth';
import NavAnonim from './NavAnonim';
import useStickyHeader from '../../hooks/useStickyHeader';

function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const burgerMenu: MutableRefObject<HTMLElement | null> = useRef(null);

  const headerElemRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const headerClientHeight: number = (headerElemRef?.current as HTMLElement)?.clientHeight;
  const isSticky: boolean = useStickyHeader(headerClientHeight);
  const headersClassName = `header ${isSticky ? 'sticky' : ''}`;

  function handleChange(input: HTMLInputElement): void {
    const isAuthorized: boolean = input.checked;
    setIsAuth(isAuthorized);
  }

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
    <>
      <header className={headersClassName} ref={headerElemRef}>
        <div className="wrapper">
          <div className="header__container">
            <h1 className="logo">
              <span className="logo__text">GraphiQL</span>
              <span className="logo__text">Countries</span>
            </h1>
            <nav className="header__nav navigation" ref={burgerMenu}>
              <button type="button" className="cross" aria-label="Close" onClick={toggleBurgerMenu}>
                &#215;
              </button>
              {isAuth ? <NavAuth /> : <NavAnonim />}
            </nav>
            <button type="button" aria-label="Open" className="burger" onClick={toggleBurgerMenu}>
              <div className="burger__content">
                <span className="burger__line" />
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="toggle-auth">
        <label htmlFor="auth">
          <input type="checkbox" name="auth" id="auth" onChange={(e) => handleChange(e.target)} />
          <span>auth</span>
        </label>
      </div>
    </>
  );
}

export default Header;
