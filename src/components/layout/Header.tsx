import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const logoUrl = 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/LOGOS-13.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9MT0dPUy0xMy5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4MzU0NzAyLCJleHAiOjE4MTk4OTA3MDJ9.CxiZ0wIoYwmHrMpobP4dgsG6qCcXn6_5pRaPI1HXdI8';

const links = [
  ['HOME', '/'], ['ABOUT US', '/about'], ['SERVICES', '/services'],
  ['OUR WORK', '/gallery'], ['CONTACT US', '/contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update(); window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <header className={`fokal-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="fokal-nav">
      <Link to="/" className="brand"><img src={logoUrl} alt="Fokal Solutions Limited" /></Link>
      <nav className={open ? 'open' : ''} aria-label="Main navigation">
        {links.map(([label, path]) => <NavLink key={path} to={path} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}
        <Link className="quote-btn mobile-quote" to="/booking">GET A QUOTE <ArrowRight size={16}/></Link>
      </nav>
      <Link className="quote-btn desktop-quote" to="/booking">GET A QUOTE <ArrowRight size={16}/></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}
