import { useSiteContent } from './SiteContentProvider';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const logoUrl = '/images/fokal-logo.png';

const links = [
  ['Home', '/'], ['About Us', '/about'], ['Services', '/services'],
  ['Our Work', '/gallery'], ['Contact', '/contact'],
];

export default function Header() {
  const site = useSiteContent();
  const siteLogo = site.image('site:logo') ?? logoUrl;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const location = useLocation();
  const home = location.pathname === '/';
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (open) navigation.current?.querySelector('a')?.focus();
  }, [open]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update(); window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <header className={`fokal-header ${scrolled ? 'is-scrolled' : ''} landing-header ${home ? '' : 'landing-header-about'}`} onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      menuButton.current?.focus();
    }
  }}>
    <div className="fokal-nav">
      <Link to="/" className="brand"><img src={siteLogo} alt="Fokal Solutions Limited" /></Link>
      <nav ref={navigation} id="main-navigation" className={open ? 'open' : ''} aria-label="Main navigation">
        {links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
      <Link className="quote-btn header-quote" to="/booking">{site.settings.quoteLabel} <ArrowRight size={16}/></Link>
      <button ref={menuButton} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}
