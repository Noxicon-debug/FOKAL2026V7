import { useSiteContent } from './SiteContentProvider';
import { Link, useLocation } from 'react-router-dom';
import { Youtube, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { logoUrl } from './Header';
import { TribalZigzag } from '../common/TribalDecor';
import { trackEvent } from '../../lib/analytics';

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" role="img" aria-label="TikTok"><path fill="currentColor" d="M16.6 5.82a4.6 4.6 0 0 0 2.69.86V3.61a4.67 4.67 0 0 1-2.69-.82A4.72 4.72 0 0 1 14.9.8h-2.88v15.74a2.42 2.42 0 1 1-2.42-2.42c.24 0 .47.04.69.1v-2.94a5.36 5.36 0 1 0 4.61 5.31V8.62a7.62 7.62 0 0 0 4.39 1.4V7.09a4.68 4.68 0 0 1-2.69-1.27Z"/></svg>;
}

export default function Footer() {
  const site = useSiteContent();
  const siteLogo = site.image('site:logo') ?? logoUrl;
  const {settings} = site;
  const { pathname } = useLocation();
  const home = pathname === '/';
  const socialLinks = [
    ['youtube', 'YouTube', Youtube], ['facebook', 'Facebook', Facebook], ['linkedin', 'LinkedIn', Linkedin],
    ['instagram', 'Instagram', Instagram], ['tiktok', 'TikTok', TikTokIcon], ['whatsapp', 'WhatsApp', MessageCircle],
  ] as const;
  const socials = <nav className="socials" aria-label="Fokal social media">
    {socialLinks.map(([key, label, Icon]) => settings[key] && <a key={key} href={settings[key]} target="_blank"
      rel="noreferrer" aria-label={`Fokal on ${label}`} onClick={key === 'whatsapp' ? () => trackEvent('whatsapp_click') : undefined}><Icon/></a>)}
  </nav>;

  return <footer className="fokal-footer landing-footer">
    <div className="footer-grid">
      <div className="landing-footer-brand">
        <Link to="/"><img className="footer-logo" src={siteLogo} alt="Fokal Solutions Limited"/></Link>
        {settings.tagline && <p className="cms-footer-tagline">{settings.tagline}</p>}
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/gallery">Our Work</Link><Link to="/contact">Contact Us</Link>
      </div>
      <div>
        <h4>Get in Touch</h4>
        <span><MapPin/> {settings.location}</span>
        <a href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`} onClick={()=>trackEvent('phone_click')}><Phone/> {settings.phone}</a>
        <a href={`mailto:${settings.email}`} onClick={()=>trackEvent('email_click')}><Mail/> {settings.email}</a>
      </div>
      {socials}
    </div>
    {home && <TribalZigzag className="landing-footer-pattern" color="#168bff"/>}
  </footer>;
}
