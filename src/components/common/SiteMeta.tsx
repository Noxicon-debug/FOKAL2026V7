import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string }> = {
  '/': { title: 'Fokal Solutions | Media, Marketing & Events in PNG', description: 'Fokal Solutions delivers media production, marketing and event services across Papua New Guinea.' },
  '/about': { title: 'About Fokal Solutions | Our Team and Story', description: 'Meet the people and values behind Fokal Solutions.' },
  '/services': { title: 'Creative Services | Fokal Solutions', description: 'Photography, video production, live streaming, events, marketing and branding services.' },
  '/gallery': { title: 'Our Work | Fokal Solutions', description: 'Explore Fokal Solutions projects across Papua New Guinea.' },
  '/contact': { title: 'Contact Fokal Solutions', description: 'Discuss your next media, marketing or event project with Fokal Solutions.' },
  '/booking': { title: 'Request a Quote | Fokal Solutions', description: 'Request a tailored quote for your next project.' },
};

export default function SiteMeta() {
  const { pathname } = useLocation(); const page = pages[pathname] ?? pages['/']; const canonical = `https://fokalltd.com${pathname}`;
  return <Helmet><title>{page.title}</title><meta name="description" content={page.description}/><link rel="canonical" href={canonical}/><meta property="og:title" content={page.title}/><meta property="og:description" content={page.description}/><meta property="og:url" content={canonical}/><meta name="twitter:title" content={page.title}/><meta name="twitter:description" content={page.description}/><script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService',name:'Fokal Solutions Limited',url:'https://fokalltd.com',email:'info@fokalltd.com',telephone:'+67572955054',address:{'@type':'PostalAddress',addressLocality:'Port Moresby',addressCountry:'PG'}})}</script></Helmet>;
}
