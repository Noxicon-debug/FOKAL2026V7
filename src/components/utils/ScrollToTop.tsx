import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const scrollToSection = () => {
      const section = document.getElementById(hash.slice(1));
      if (!section) return false;
      section.scrollIntoView();
      return true;
    };
    if (scrollToSection()) return;
    // Routes may be loaded lazily, so wait for the section to mount.
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
