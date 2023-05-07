import { useLayoutEffect, useState } from 'react';

function useStickyHeader(offset = 0): boolean {
  const [isSticky, setIsSticky] = useState(false);

  function handleScroll(): void {
    setIsSticky(window.scrollY > offset);
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return isSticky;
}

export default useStickyHeader;
