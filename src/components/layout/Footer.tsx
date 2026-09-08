import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { logoUrl } from './Header';

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" role="img" aria-label="TikTok"><path fill="currentColor" d="M16.6 5.82a4.6 4.6 0 0 0 2.69.86V3.61a4.67 4.67 0 0 1-2.69-.82A4.72 4.72 0 0 1 14.9.8h-2.88v15.74a2.42 2.42 0 1 1-2.42-2.42c.24 0 .47.04.69.1v-2.94a5.36 5.36 0 1 0 4.61 5.31V8.62a7.62 7.62 0 0 0 4.39 1.4V7.09a4.68 4.68 0 0 1-2.69-1.27Z"/></svg>;
}

export default function Footer() {
  return <footer className="fokal-footer">
    <div className="footer-grid">
      <div><img className="footer-logo" src={logoUrl} alt="Fokal"/><p>A Papua New Guinea based media production, marketing and events company delivering creative solutions that connect brands with people and make an impact that lasts.</p><nav className="socials" aria-label="Fokal social media"><a href="https://www.facebook.com/fokalsolutionslimited/" target="_blank" rel="noreferrer" aria-label="Fokal on Facebook"><Facebook/></a><a href="https://www.linkedin.com/company/fokalltd/" target="_blank" rel="noreferrer" aria-label="Fokal on LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/fokalltd/" target="_blank" rel="noreferrer" aria-label="Fokal on Instagram"><Instagram/></a><a href="https://www.tiktok.com/@fokalsolutions" target="_blank" rel="noreferrer" aria-label="Fokal on TikTok"><TikTokIcon/></a><a href="https://wa.me/67572955054" target="_blank" rel="noreferrer" aria-label="Contact Fokal on WhatsApp"><MessageCircle/></a></nav></div>
      <div><h4>QUICK LINKS</h4><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/gallery">Our Work</Link><Link to="/contact">Contact Us</Link></div>
      <div><h4>OUR SERVICES</h4><span>Video Production</span><span>Photography</span><span>Live Streaming</span><span>Events</span><span>Marketing</span><span>Staging & AV</span></div>
      <div><h4>CONTACT US</h4><a href="tel:+67572955054"><Phone/> +675 7295 5054 / 8478 2028</a><a href="mailto:info@fokalltd.com"><Mail/> info@fokalltd.com</a><span><MapPin/> Port Moresby, NCD<br/>Papua New Guinea</span></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Fokal Solutions Limited. All Rights Reserved.</span><b>FOCAL POINT. <em>REAL IMPACT.</em></b></div>
  </footer>;
}

